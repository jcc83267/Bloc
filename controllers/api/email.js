const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const router = require('./twitch');
require('dotenv').config()

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

async function sendMail(email){
    try{
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type: 'OAuth2',
                user: 'KevinTulakyan@gmail.com',
                cilentId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token
            },
            

        })

        const mailOptions ={
            from: 'Bloc <KevinTulakyan@gmail.com>',
            to: email,
            subject: 'Welcome to the Bloc!',
            text:'',
            html: '<h1>WELCOME TO THE BLOC</h1> Your Bloc account has been successfully created!',
        }

        const result =  transport.sendMail(mailOptions)
        return result
    }
    catch(error){
        return error
    }

}

router.post('/', (req, res) => {
    let email = req.body.email;
    sendMail(email);
    console.log('email sent')
    res.json('email sent');
});

  
module.exports = router;