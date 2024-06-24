const jwt =require('jsonwebtoken')
const Users = require('../models/userModel')
const authAdmin = async (req,res,next)=>{
    try {
        const user = await Users.findById(req.user.id)
        if(!user)res.status(400).json({msg:"user not found"});
        if(user.role === 0)
        return res.status(400).json({msg:"Admin Resources Access Denied"})
        next();
    } catch (error) {
        return res.status(400).json({msg:error.message});
    }
}

module.exports=authAdmin;