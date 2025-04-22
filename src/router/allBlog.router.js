import Router from 'express'
import prisma from '../lib/db.js';

const router=Router();
router.get('/allBlog',async (req, res) => {
    try {
      const allBlogs=await prisma.blog.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            author:{
                select:{
                    name:true,
                    email:true
                }
            }
        }})
        if(!allBlogs){
            return res.status(400).json({message:' their Blog are not created'});
        } 
        return res.status(200).json({message:"Blog fetched successfully!", allBlogs:allBlogs}); 
    } catch (error) {
        res.status(500).json({
            "message": "Blog is not fetched",
            error: error.message})
        
    }
})
export default router;