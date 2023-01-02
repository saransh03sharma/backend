import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRoutes from "./routes/users.js";
import questionRoutes from './routes/Question.js'
import answerRoutes from './routes/Answers.js'
import dotenv from 'dotenv'

const app = express(); 
dotenv.config();
// express server created

app.use(express.json({limit:'30mb', extended:true}))
app.use(express.urlencoded({limit:'30mb', extended:true}))
app.use(cors());

//req is request
//rs is response
app.get('/',(req, res) =>{
    res.send("This is a stack overflow clone api")
})
app.use('/user', userRoutes) //if the url is /user/signup or /user/login
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)


const PORT = process.env.PORT || 5000

//this will create static mongodb local storage
//we want cloud storage atlas

const DATABASE_URL = process.env.CONNECTION_URL
mongoose.connect(
    DATABASE_URL,{ useNewUrlParser:true, useUnifiedTopology:true}
)
//is app is successfully running that is listening to server
    .then(()=> app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)}))
    .catch((err)=>console.log(err.message))