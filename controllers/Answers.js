import mongoose from "mongoose";
import Questions from "../models/Question.js";

export const postAnswer = async(req,res)=>{
    const {id : _id} = req.params;
    
    const {noOfAnswers, answerBody, userAnswered, userId} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        //if the id is not an valid id
        return res.status(404).send('question unavailable')
    }
    updateNoOfQuestions(_id,noOfAnswers )
    try {
        //$addToSet: {'answer':[{answerBody, userAnswered, userId:req.userId}]}})
        // add the values to the answer array 
        
     
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {$addToSet: {'answer':[{answerBody: answerBody, userAnswered:userAnswered, userId:userId}]}}) 
        res.status(200).json(updatedQuestion)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

//after domain name everything is params
///post/:id

const updateNoOfQuestions = async(_id, noOfAnswers)=>{
    try {
        await Questions.findByIdAndUpdate(_id, {$set:{'noOfAnswers':noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async(req,res)=>{
    const {id:_id} = req.params;
    const {answerId, noOfAnswers} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        //if the id is not an valid id
        return res.status(404).send('question unavailable')
    }

    if(!mongoose.Types.ObjectId.isValid(answerId)){
        //if the id is not an valid id
        return res.status(404).send('answer unavailable')
    }
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        await Questions.updateOne(
            {_id},
            { $pull:{'answer':{_id:answerId}}})
            //pull a specific id from answer array
            res.status(200).json({message:"Successfully deleted"})
        
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }

}