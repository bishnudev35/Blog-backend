import Router from 'express';
import prisma from '../lib/db.js';
import authMiddelwear from '../middelwear/auth.middelwear.js';

const router=Router();
router.post('/updateAsAdmin',authMiddelwear,async (req, res) => {
 
 try {
    // const user=req.body.user;
   
    // if(!user){
    //     return res.status(401).json({message:'Unauthorized'});

    // }

    // console.log("user",user)
    // const {id}=user;
    // const isAdmin=await prisma.user.findUnique({
    //     where:{
    //         id
    //     },
    //     select:{
    //         admin:true
    //     }
    // })
   const Admin=req.body.user.admin;
   console.log("Admin",Admin)
   if(Admin){
    console.log("you are a admin!")
    const {email}=req.body;
    if(!email){
        return res.status(400).json({message:'Please fill all fields'});
    }
    const user=await prisma.user.findUnique({
        where:{
            email
        },
        select:{
     
            admin:true
        }
    }) 
    if(!user){
        return res.status(400).json({message:'User does not exist'});
    }else if(user.admin===true){
        return res.status(400).json({message:'User already exist as a Admin'});
    } 
    const updatedUser=await prisma.user.update({
        where:{
            email
        },
        data:{
            admin:true
        }
    })
    if(!updatedUser){
        return res.status(400).json({message:'User is not updated'});
    }
    return res.status(200).json({message:"User is updated successfully!", user:{
        name:updatedUser.name,
        email:updatedUser.email,
        admin:updatedUser.admin
    }});  
   }else{
   return res.status(403).json({message:'You are not authorized to update user as a admin!'});
   }
 } catch (error) {
    res.status(500).json({
        "message": "User is not updated",
        error: error.message})
    
 }
})
export default router;