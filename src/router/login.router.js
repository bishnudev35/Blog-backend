import Router from 'express'
import jwtsign from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import prisma from '../lib/db.js';
const router=Router();

router.post('/login',async (req, res) => {
    try {
       const {email,password}=req.body;
         if(!email || !password){
              return res.status(400).json({message:'Please fill all fields'});
         }
            const user=await prisma.user.findUnique({
                where:{
                    email
                }
            })
            if(!user){
                return res.status(400).json({message:'User does not exist'});
            }
            const isPasswordValid=bcrypt.compareSync(password,user.password);
            if(!isPasswordValid){
                return res.status(400).json({message:'Invalid password'});
            }
            const token=jwtsign(user,process.env.JWT_SECRET);
            return res.status(200).json({message:"user is logged in!", user:{
                "name":user.name,
                "email":user.email
            },token});
    } catch (error) {
        res.status(500).json({
            "message": "User is not logged in",
            error: error.message})
        
    }
})
export default router;