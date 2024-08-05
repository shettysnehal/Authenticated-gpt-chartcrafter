import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

 
const sendverificationEmail = async(recipient,otp)=>{
   //console.log(recipient)
 
    //console.log(token)
    const verificationotp  = otp
    const transporter = nodemailer.createTransport({
    
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.EMAIL_SECURE), // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
      
    })
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to: recipient,
        subject: 'Verify your email',
        text: `your otp for chatcraft signin is ${verificationotp}`,
       
      };
      try {
        //console.log(1)
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true
      } catch (error) {
        console.error('Error sending email:', error);
        return false 
      }
       
}
export default sendverificationEmail
