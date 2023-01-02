import jwt from 'jsonwebtoken'

const auth =(req,res,next)=>{
    //check if request has a token or not
    //then check validity and allow the next function to be executed

    try {
        const token = req.headers.authorization.split(' ')[1]
        //extract the part after Bearer

        //this 'test' is a secret which will help us know if token is valid or not
        let decodedata = jwt.verify(token, process.env.JWT_SECRET)
        //if verifycation fails error thrown
        //set new value of userId
        req.userId = decodedata?.id

        next()
    } catch (error) {
        console.log(error)
    }
}
export default auth