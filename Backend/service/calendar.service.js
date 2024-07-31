const {OAuth2Client, UserRefreshClient} = require('google-auth-library');
const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const dotenv = require('dotenv');
const Calendar = require('../model/calendar');

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

            if(decoded){
                const email = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`,{
                    headers: {
                        Authorization: `Bearer ${decoded.access_token}`
                    }
                }).then(res => {
                    return res.data.email;
                }).catch(err => {
                    return res.status(401).json({message: "Invalid token"});
                });
    
                const appointments = await Calendar.findAll({
                    where:{
                        email: email,
                        day: req.query.day,
                        month: req.query.month,
                        year: req.query.year
                    },
                    attributes: ['id','title', 'startHour', 'endHour', 'startMinute', 'endMinute', 'day', 'month', 'year']
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



module.exports = {
    getAppointmentsByDate
};