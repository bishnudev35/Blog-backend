import Router from 'express';
import  bcrypt from 'bcrypt';
import prisma from '../lib/db.js';
import jwtsign from '../utils/jwt.js';

const router=Router();

router.post('/register',async (req, res) => {
  try {
    console.log("hskjdghksdjhgkj")
    console.log(req.body)
    const {name,email,password}=req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({message:'Please fill all fields'});
    }
    if(password.length<6){
        return res.status(400).json({message:'Password must be at least 6 characters'});
    }
    const existingUser=await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(existingUser){
        return res.status(400).json({message:'User already exists'});
    }
    const hashedPassword=bcrypt.hashSync(password,10);
    const user=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        },
    })
    if(!user){
        console.log("user not created!")
    }
    //return res.status(201).json({message:'User created successfully'});
    // Save user to database (mocked here as an array) 
    const token=jwtsign(user,process.env.JWT_SECRET);
    res.status(201).json({message:'User created successfully',user:{
        "user":user.name,
        "email":user.email,
    },token});


  } catch (error) {
    res.status(500).json({
        "message": "User is not created",
        error: error.message})
  }

})
export default router;