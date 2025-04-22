import Router from 'express'
import prisma from '../lib/db.js';
import authMiddelwear from '../middelwear/auth.middelwear.js';

const router=Router();

router.get('/myBlog',async (req, res) => {
    try {
        console.log("sdjlkfajdlkgd")
        console.log("user",req.body.user)
        const id = parseInt(req.user.id);
        console.log("id",id)
        if(!id){
            return res.status(400).json({message:'Please provide the blog id!'});
        }
        const existUser=await prisma.user.findUnique({
            where:{
                id
            }
        })  
        if(!existUser){
            return res.status(400).json({message:'User does not exist'});
        }
        const blog = await prisma.blog.findMany({
            where:{
                authorId:id
            },
            select:{
                title:true,
                content:true
            }
        })
        if(!blog){
            return res.status(400).json({message:'Blog are not created'});
        } 
        return res.status(200).json({message:"Blog fetched successfully!", blog:blog});     
    } catch (error) {
        res.status(500).json({
            "message": "Blog is not updated",
            error: error.message})
        
    }
})
export default router