const {OAuth2Client, UserRefreshClient} = require('google-auth-library');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
);

async function verify(req, res) {
    try{
        const {tokens} = await client.getToken(req.body.token);
        jsonwebtoken.sign({access_token: tokens.access_token, refresh_token: tokens.refresh_token}, process.env.JWT_SECRET, {expiresIn: '365d'}, (err, token) => {
            return res.cookie('jwt', token, {httpOnly: true, secure: !process.env.DEV, sameSite: 'lax', maxAge: 365*24*60*60*1000}).status(200).json({message: "Success"});
        })
    }catch(err){
        res.status(400).json({mesaage:"Invalid token", err});
    }

}

async function refreshToken(req, res) {
    try{
        if(!req.cookies.jwt) return res.status(400).json({message: "Invalid cookie"});

        jsonwebtoken.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, decoded) => {

            const user = new UserRefreshClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, decoded.refresh_token);         

            const tokens = await user.refreshAccessToken();

            
            jsonwebtoken.sign({access_token: tokens.credentials.access_token, refresh_token: tokens.credentials.refresh_token}, process.env.JWT_SECRET, {expiresIn: '365d'}, (err, token) => {
                return res.cookie('jwt', token, {httpOnly: true, secure: !process.env.DEV, sameSite: 'lax', maxAge: 365*24*60*60*1000}).status(200).json({access_token: tokens.credentials.access_token});
            });
        });

        
    }catch(err){
        res.status(400).json({mesaage:"Invalid refresh token"});
    }
}

async function logout(req, res) {
    res.clearCookie('jwt');
    res.status(200).json({message: "Success"});
}

module.exports = {
    verify,
    refreshToken,
    logout
};