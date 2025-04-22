import Router from 'express'
import prisma from '../lib/db.js';
const router=Router()

router.delete('/deleteBlog',async (req, res) => {
    try {
        const {id} = req.body;
        if(!id){
            return res.status(400).json({message:'Please provide the blog id!'});
        }
       const existBlog=await prisma.blog.findUnique({
        where:{
            id:parseInt(id),
        }
       })
       if(!existBlog){
        console.log("this blog doese not exist!")
       }
        const blog = await prisma.blog.delete({
            where:{
                id:parseInt(id)
            }
        })
        console.log("fsdkngkjdnv")
        if(!blog){
            return res.status(400).json({message:'Blog does not exist'});
        }
        return res.status(200).json({message:"Blog deleted successfully!", blog:{
            "title":blog.title,
            "content":blog.content
        }});
    } catch (error) {
    
        res.status(500).json({
            "message": "Blog is not deleted",
            error: error.message})
    }
})
export default router;