import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const signUp = async (req, res,next) =>{
 //starting the session for transations  
 const session = await await mongoose.startSession()
 //start a new transaction
 session.startTransaction()
 try{
    //create a new  user
    const {name, email, password} = req.body;
    console.log(name, email, password)
    //check if the user exists
    const existingUser = await User.findOne({ email})
    if(existingUser){
        const error = new Error('User already exists');
        error.statusCode = 409;
        throw error;
    }

    //hash the password
    //save the new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create([{name, email, password:hashedPassword}], {session})
    
    const userWithoutPassword = newUser[0].toObject();
    delete userWithoutPassword.password;

    const token = jwt.sign({userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
            token,
            user: userWithoutPassword,
        }
    })
 }catch(error){
     // rolling back the transaction if any error occurs
     await session.abortTransaction();
     session.endSession();
     next(error);
 }
}

export const signIn = async (req, res,) =>{

}

export const signOut = async (req, res,) =>{

}