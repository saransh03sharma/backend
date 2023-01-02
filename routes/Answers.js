import express from 'express'
import {postAnswer, deleteAnswer} from '../controllers/Answers.js'
import auth from '../middlewares/auth.js'
const router=express.Router()


//patch to update existing database
router.patch("/post/:id",auth,postAnswer)
//entire record not being deleted
//auth as middleware
router.patch("/delete/:id",auth,deleteAnswer)


export default router