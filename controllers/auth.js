//controllers contain different functions
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'

export const signup = async(req,res)=>{
   
    const { name, email, password} = req.body;
    try{
        //find if any such user with teh email exists
        const existinguser = await users.findOne({ email })
        if(existinguser){
            return res.status(404).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const newUser = await users.create({name, email, password:hashedPassword})
        const token = jwt.sign({email:newUser.email, id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({result: newUser, token})
    }catch(error){
        //status 500 indicates internal sever error
        res.status(500).json("Something went wrong ")
    }

}
export const login = async(req,res) => {
    
    const {email, password} = req.body;
    try{
        //find if any such user with the email exists
        const existinguser = await users.findOne({ email })
        if(!existinguser){
            return res.status(404).json({message:"User doesn't exists"})
        }
         
        const isPasswordCrct = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCrct)
        {
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email:existinguser.email, id:existinguser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({ result: existinguser, token })
    }catch(error){
        //status 500 indicates internal sever error
        res.status(500).json("Something went wrong ")
    }


}