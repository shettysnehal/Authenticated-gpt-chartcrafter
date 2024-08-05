import sendverificationEmail from "../utils/services.js";
import userInfo from "../models/userInfo.js"
import jwt from"jsonwebtoken"
import bcrypt from "bcrypt"

import dotenv from 'dotenv'
dotenv.config()

import crypto from 'crypto';
function generateOTP() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
        const randomDigit = crypto.randomInt(0, 10);
        otp += randomDigit.toString();
    }
    return otp;
}
function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


import { Vonage } from "@vonage/server-sdk";
export const loginThroughusername= async(req,res)=>{
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({status:"fail", msg: "username and password are required" });
    }

    try {
        // Check if user with the provided username exists
        const user = await userInfo.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(404).json({status:"fail", msg: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate JWT token
            const token = generateToken(user.id);

            // Respond with user information and token
            res.status(200).json({status:"success",
                msg: "Login successful",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.mail,
                    phoneNumber: user.mblnumber
                },
                token
            });
        } else {
            res.status(400).json({ status:"fail",msg: "Invalid password" });
        }
    } catch (e) {
        res.status(500).json({status:"fail", msg: "Something went wrong", error: e.message });
    }

}

export const loginThroughmblnumber = async(req,res) =>{
   
    
    const {mblnumber} = req.body;   
   

        const vonage = new Vonage({
    apiKey: "3ff34c38",
    apiSecret: "VWo7ZUePpfQPcSBa"
})
    const otp = generateOTP()
    const from = "Vonage APIs"
    

async function sendSMS(to,text) {
    try {
        const response = await vonage.sms.send({to,from,text})
       
        //console.log(response)
       
       return response 
       
        
}
 catch (error) {
       res.status(400).json({status:"fail",error:'Error sending SMS:',msg: error.message});
    }

       
    } 

try{
    const isEXist = await userInfo.findOne({where:{
        mblnumber:mblnumber
    }})
    if(!isEXist){
        res.status(404).json({status:"fail",msg:"user doesnt exists.Register first"})
    }
    else{
         // Replace with user's actual phone number
        const message = `Your OTP for login is: ${otp}`; // Replace with your OTP message
        const response  = await sendSMS(mblnumber,message);
         const user = await userInfo.update(
            { last_otp: otp },
            { where: { mblnumber: mblnumber } }
        );
        res.status(200).json({status:"success",msg:"otp sent",response:response,user})
        
    }
    
}catch(e){
    res.status(400).json({status:"fail",msg:"something went wrong",error:e})
}


 };
export const checkotp = async(req,res)=>{
    let user 
    try{
        const mblnumber = req.body.mblnumber?req.body.mblnumber:null
        const mail = req.body.mail?req.body.mail:null;
        const otp = req.body.otp;
        if(mblnumber){
            user = await userInfo.findOne({
                where:{
                    mblnumber:mblnumber
                }
            })
           
        }
        else if(mail){
            user = await userInfo.findOne({
                where:{
                    mail:mail
                }
            })
          
        }
       
     console.log(user)
        console.log(otp) 
        if(user.dataValues.last_otp == otp){
            const token = generateToken()
            console.log(1)
            res.status(200).json({status:"success",msg:"user verified",token:token})
        }
        else{
            res.json({status:"fail",msg:"verification unsuccesfull"})
        }
    }
    catch(e){
        res.json({status:"fail",msg:"something went wrong",error:e})
    }
   
 }

export const loginThroughmail = async (req,res) =>{
    const {email} = req.body;
    const isExist = await userInfo.findOne({
        where:{
            mail:email
        }
    })
    //console.log(isExist)
    if(!isExist){
        res.status(400).json({status:"fail",msg:"user doesnt exists"})
    }
    else{
        
        try{
            //console.log(
            const otp = generateOTP();
            const status = await sendverificationEmail(email,otp)
            if(status){
                const user = await userInfo.update(
                    { last_otp: otp },
                    { where: { mail:email } }
                );
                res.status(200).json({status:"success",msg:"mail sent succesfully",user})
            }
           
            
        }
        catch(e){
            console.log(e)
            res.status(404).json({status:"fail",msg:"something went wrong"})
        }
       
    }
} 
/* export const verifyEmail = async (req,res) =>{
    const {token} = req.params;
    try {
        // Find user by verification token
        const user = await userInfo.findOne({ where: { verificationToken: token } });
    
        if (!user) {
          return res.status(404).json({ message: 'Invalid verification token.' });
        }
    
        // Update user's verified status and clear verification token
        await userInfo.update({ verified: true, verificationToken: null },
            {where:{
                verificationToken: token
            }}
            
        );
    
        return res.status(200).json(
            { message: 'Email verified "success"fully.',
               
             }
            

        );
      } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: '"fail"ed to verify email.' });
      }
} */
/* export const  verified = async (req,res) =>{
    const {email} = req.body
    try{
        const user = await userInfo.findOne({where:{
            mail : email
        }})
        console.log(user.verified)
        if(user.verified){
            res.status(200).json({message:"verification succesfull",verified:user.verified})
        }
        res.json({message:"verification unsuccesfull",verified:user.verified})
    }
    catch(e){
        res.json({error:"some problem occured"})
    }
    
} */
export const register = async (req,res) =>{
    const { username, password, email,mblnumber } = req.body;

    if (!username || !password || !email || !mblnumber) {
        return res.status(400).json({status:"fail", msg: "All fields are required" });
    }

    try {
        console.log(1)
        // Check if user already exists
        const userExists = await userInfo.findOne({
            where: {
                mail: email,
                mblnumber: mblnumber
            }
            
        });
        //console.log(21)
        if (userExists) {
            //console.log(24)
            return res.status(400).json({status:"fail", msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        //console.log(28)
        
        const user = await userInfo.create({
            username:username ,
            password:hashedPassword, // Ensure that you hash the password before storing it in a real application
            mail: email,
            mblnumber: mblnumber
        });
        //console.log(2)
        console.log(user)
        // Generate JWT token
        const token = generateToken(user.id);
       // console.log(3)
        // Respond with user and token
        res.status(200).json({status:"success",
            msg: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.mail,
                phoneNumber: user.mblnumber
            },
            token
        });
    } catch (e) {
        res.status(500).json({status:"fail", msg: "Something went wrong", error: e.message });
    }
}
