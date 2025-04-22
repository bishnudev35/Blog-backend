import Router from 'express'
import prisma from '../lib/db.js';
import authMiddelwear from '../middelwear/auth.middelwear.js';
const router=Router();

router.post("/createBlog",authMiddelwear,async(req,res)=>{
    try {
       
        const { title , content} = req.body;
        const {id}=req.body.user;
        console.log("req",req)
        if(!id || !title || !content){
            console.log("please fill the all filled!")
        }
        
    const userandblog = await prisma.user.update({
        where:{
            id
        },
       data:{
        blogs:{
            create:[
                {
                    title,
                    content
                }
            ]
        }
       }
    })
    console.log(userandblog)
    // const createblog=await prisma.blog.create({
    //  data:{
    //     title,
    //     content,
    //     author:authorId
    //  },
    // })
    if(!userandblog){
        console.log("blog is not created!")
    }


    return res.status(200).json({
        message:"blog created sucessfully!",
        userandblog
    })
       
    } catch (error) {
        console.log("error:",error.message)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
  
    


})

 
export default router

