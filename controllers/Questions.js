import Questions from '../models/Question.js'
import mongoose from 'mongoose'



export const AskQuestion= async(req, res) =>{
    const postQuestionData = req.body;
    //req.userID would be the user id of the requesting user
    const postQuestion = new Questions({...postQuestionData})
    try{
        await postQuestion.save();
        res.status(200).json("Posted a question succesfully")//message to frontend
        
    }
    catch(error){
        console.log(error)
        res.status(409).json("Couldn't post a new question")
    }
}

export const getAllQuestions=async(req, res)=>{
    try {
        const questionList = await Questions.find();
        //this questionlist will have all questions
        res.status(200).json(questionList);
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}

export const deleteQuestion = async(req, res)=>{
    const {id: _id} = req.params
    //param available in url

    if(!mongoose.Types.ObjectId.isValid(_id)){
        //if the id is not an valid id
        return res.status(404).send('question unavailable')
    }

    try {
        await Questions.findByIdAndRemove( _id )
        res.status(200).json({message:"successfully deleted ..."})
    } catch (error) {
        console.log(error)
        res.status(404).json({message:error.message})
    }
}

export const voteQuestion=async(req,res)=>{
    const {id:_id} = req.params
    const{value, userId} = req.body

    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        //if the id is not an valid id
        return res.status(404).send('question unavailable')
    }
    try {
        const question = await Questions.findById(_id)
        //try if id of any element of upvote array matches with userId

        const upIndex = question.upVote.findIndex((id)=>id === String(userId))
        const downIndex = question.downVote.findIndex((id)=>id === String(userId))

         if(value ==='upvote'){
            
            //if the user already downvoted
            
            if(downIndex !== -1){
                
                question.downVote = question.downVote.filter((id)=>id!==String(userId))
            }
            //if the user is new
            if(upIndex === -1){
                
                question.upVote.push(userId)
            }
            else{
                question.upVote = question.upVote.filter((id)=>id!==String(userId))
            }

            //if the user has already upvoted, remove his vote
            

         }
         else if(value==='downvote'){
            //if the user already downvoted
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id)=>id!==String(userId))
            }
            //if the user is new
            if(downIndex === -1){
                question.downVote.push(userId)
                
            }
            else{
                question.downVote = question.downVote.filter((id)=>id!==String(userId))
            }
            
            //if the user has already downvoted, remove his vote

         }
        
         await Questions.findByIdAndUpdate(_id, question)
         res.status(200).json({message:"Voted successfully"})

    } catch (error) {
        res.status(404).json({message:"ID not found"})
    }

}