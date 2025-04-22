import Router from 'express'
import prisma from '../lib/db.js';
const router=Router();

router.post('/updateBlog',async (req, res) => {
    try {
        const {id, title, content } = req.body;
        if(!id || !title || !content){
            return res.status(400).json({message:'Please fill all fields'});
        }
        const blog = await prisma.blog.update({
            where:{
                id:parseInt(id)
            },
            data:{
                title,
                content
            }
        })
        if(!blog){
            return res.status(400).json({message:'Blog does not exist'});
        }
        return res.status(200).json({message:"Blog updated successfully!", blog:{
            "title":blog.title,
            "content":blog.content
        }});
    } catch (error) {
        res.status(500).json({
            "message": "Blog is not updated",
            error: error.message})
    }
})
export default router