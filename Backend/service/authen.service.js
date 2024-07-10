const {OAuth2Client, UserRefreshClient} = require('google-auth-library');
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
        res.json({access_token: tokens.access_token, refresh_token: tokens.refresh_token});
    }catch(err){
        res.status(400).json({mesaage:"Invalid token"});
    }

}

async function refreshToken(req, res) {
    try{
        const user = new UserRefreshClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, req.body.refreshToken);
        const tokens = await user.refreshAccessToken();
        res.json({access_token: tokens.credentials.access_token, refresh_token: tokens.credentials.refresh_token});
    }catch(err){
        res.status(400).json({mesaage:"Invalid refresh token"});
    }
}

module.exports = {
    verify,
    refreshToken
};