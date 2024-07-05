const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv');
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(req, res) {
    try{
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const {name, picture} = payload
        return res.json({ name, picture });
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    } 
}

module.exports = {
    verify
};