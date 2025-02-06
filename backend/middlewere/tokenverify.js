import jwt from "jsonwebtoken"
import "dotenv/config"

 const tokenVerify=async(req,res,next)=>{
    const token=req.headers["authorization"]
    // console.log(token);
    try{
        const verification= jwt.verify(token,process.env.JWT_SECRET_KEY)
        // console.log("token verified");
        if(!verification){
            return res.status(201).send("token verification error")
        }
        next()
    }catch(err){
        return res.status(500).json({ error: "Error in token", details: err.message });

    }


}
export {tokenVerify}