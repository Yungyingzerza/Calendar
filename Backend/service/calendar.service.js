const {OAuth2Client, UserRefreshClient} = require('google-auth-library');
const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const dotenv = require('dotenv');
const Calendar = require('../model/calendar');
const {Op} = require('sequelize');

dotenv.config();
const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
);

async function getAppointmentsByDate(req, res) {
    try{
        if(!req.cookies.jwt) return res.status(401).json({message: "Invalid cookie"});

        if(!req.query.day || !req.query.month || !req.query.year) return res.status(400).json({message: "Invalid date"});

        jsonwebtoken.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, decoded) => {   
            if(err) return res.status(401).json({message: "Invalid token"});

            if(decoded){
                const email = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`,{
                    headers: {
                        Authorization: `Bearer ${decoded.access_token}`
                    }
                }).then(res => {
                    return res.data.email;
                }).catch(err => {
                    return "error";
                });
                
                if(email === "error") return res.status(401).json({message: "Invalid token"});

                const day = new Date(req.query.year, req.query.month, req.query.day);

                if(day.toString() === "Invalid Date") return res.status(400).json({message: "Invalid date"});
    
                const appointments = await Calendar.findAll({
                    where:{
                        email: email,
                        [Op.or]: [
                            {
                                start:{
                                    [Op.between]: [new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0), new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59)]
                                }
                            },
                            {
                                end:{
                                    [Op.between]: [new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0), new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59)]
                                }
                            },
                            {
                                [Op.and]: [
                                    {
                                        start:{
                                            [Op.lte]: new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0)
                                        }
                                    },
                                    {
                                        end:{
                                            [Op.gte]: new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59)
                                        }
                                    }
                                ]
                            }
                        ]
                        
                    },
                    attributes: ['id','title', 'start', 'end']
                });


                const user = new UserRefreshClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, decoded.refresh_token);
                const tokens = await user.refreshAccessToken();
                jsonwebtoken.sign({access_token: tokens.credentials.access_token, refresh_token: tokens.credentials.refresh_token}, process.env.JWT_SECRET, {expiresIn: '365d'}, (err, token) => {
                    return res.cookie('jwt', token, {httpOnly: true, secure: !process.env.DEV, sameSite: 'lax', maxAge: 365*24*60*60*1000}).status(200).json({appointments});
                });
            }else{
                return res.status(401).json({message: "Invalid token"});
            }

            
        });

    }catch(err){
        res.status(401).json({message: "Invalid token"});
    }
}

async function getAppointmentsByWeek(req, res) {
    try{
        if(!req.cookies.jwt) return res.status(401).json({message: "Invalid cookie"});

        if(!req.query.day || !req.query.month || !req.query.year) return res.status(400).json({message: "Invalid date"});

        jsonwebtoken.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, decoded) => {   
            if(err) return res.status(401).json({message: "Invalid token"});

            if(decoded){
                const email = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`,{
                    headers: {
                        Authorization: `Bearer ${decoded.access_token}`
                    }
                }).then(res => {
                    return res.data.email;
                }).catch(err => {
                    return "error";
                });

                if(email === "error") return res.status(401).json({message: "Invalid token"});

                const tempDate = new Date(req.query.year, req.query.month, req.query.day);
                const dayOfWeek = tempDate.getDay();
                const sunday = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() - dayOfWeek);
                const saturday = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + (6 - dayOfWeek) + 1);

                const appointments = await Calendar.findAll({
                    where:{
                        email: email,
                        [Op.or]:[
                            [
                                {
                                    start:{
                                        [Op.between]: [new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 0, 0, 0), new Date(saturday.getFullYear(), saturday.getMonth(), saturday.getDate(), 23, 59, 59)]
                                    },
                                    end:{
                                        [Op.between]: [new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 0, 0, 0), new Date(saturday.getFullYear(), saturday.getMonth(), saturday.getDate(), 23, 59, 59)]
                                    }
                                }
                            ],
                            [
                                {
                                    start:{
                                        [Op.lt]: new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 0, 0, 0)
                                    },
                                    end:{
                                        [Op.gt]: new Date(saturday.getFullYear(), saturday.getMonth(), saturday.getDate(), 23, 59, 59)
                                    }
                                }
                            ]
                        ] 
                    },
                    attributes: ['id','title', 'start', 'end']
                });
                const user = new UserRefreshClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, decoded.refresh_token);
                const tokens = await user.refreshAccessToken();
                jsonwebtoken.sign({access_token: tokens.credentials.access_token, refresh_token: tokens.credentials.refresh_token}, process.env.JWT_SECRET, {expiresIn: '365d'}, (err, token) => {
                    return res.cookie('jwt', token, {httpOnly: true, secure: !process.env.DEV, sameSite: 'lax', maxAge: 365*24*60*60*1000}).status(200).json({appointments});
                });
            }else{
                return res.status(401).json({message: "Invalid token"});
            }

            
        });

    }catch(err){
        res.status(401).json({message: "Invalid token"});
    }
}

async function updateAppointmentsById(req, res) {
    try{
        if(!req.cookies.jwt) return res.status(401).json({message: "Invalid cookie"});

        if(!req.body.id) return res.status(400).json({message: "Invalid id"});

        if(!req.body.title || !req.body.start || !req.body.end) return res.status(400).json({message: "Invalid data"});

        jsonwebtoken.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, decoded) => {   
            if(err) return res.status(401).json({message: "Invalid token"});

            if(decoded){
                const email = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`,{
                    headers: {
                        Authorization: `Bearer ${decoded.access_token}`
                    }
                }).then(res => {
                    return res.data.email;
                }).catch(err => {
                    return "error";
                });

                if(email === "error") return res.status(401).json({message: "Invalid token"});

                const appointment = await Calendar.findOne({
                    where:{
                        email: email,
                        id: req.body.id
                    },
                    attributes: ['id','title', 'start', 'end']
                });

                if(!appointment) return res.status(404).json({message: "Appointment not found"});

                const appointmentUpdate = await appointment.update({
                    title: req.body.title,
                    start: req.body.start,
                    end: req.body.end
                });

                const save = await appointmentUpdate.save();

                const user = new UserRefreshClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, decoded.refresh_token);
                const tokens = await user.refreshAccessToken();
                jsonwebtoken.sign({access_token: tokens.credentials.access_token, refresh_token: tokens.credentials.refresh_token}, process.env.JWT_SECRET, {expiresIn: '365d'}, (err, token) => {
                    return res.cookie('jwt', token, {httpOnly: true, secure: !process.env.DEV, sameSite: 'lax', maxAge: 365*24*60*60*1000}).status(200).json({save});
                });
            }else{
                return res.status(401).json({message: "Invalid token"});
            }

            
        });

    }catch(err){
        res.status(401).json({message: "Invalid token"});
    }
}



module.exports = {
    getAppointmentsByDate,
    getAppointmentsByWeek,
    updateAppointmentsById
};