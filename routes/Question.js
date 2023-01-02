import express from 'express'
import {AskQuestion,getAllQuestions, deleteQuestion, voteQuestion} from '../controllers/Questions.js'
import auth from '../middlewares/auth.js'

const router=express.Router()

router.post("/Ask",auth,AskQuestion)
//askquestion is next function

//even without aunthentication he can see all questions
router.get("/get",getAllQuestions)
router.delete("/delete/:id",auth, deleteQuestion);
router.patch('/vote/:id',auth, voteQuestion)
export default router