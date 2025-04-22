import express from 'express';
import regRout from './router/register.router.js';
import loginRout from './router/login.router.js'
import blogCreate from './router/creatBlog.router.js'
import updateBlogRout from './router/updateBlog.router.js'
import deleteBlog from './router/delete.router.js'
import myBlog from "./router/myBlog.router.js"
import allBlogs from "./router/allBlog.router.js"
import sinUpAsAdmin from './router/signAsAdmin.router.js'
import updateAsAdmin from './router/updateAsAdmin.router.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use("/api/v1/user", regRout);
app.use("/api/v1/user",loginRout)
app.use("/api/v1/user",blogCreate)
app.use("/api/v1/user",updateBlogRout)
app.use("/api/v1/user",deleteBlog);
app.use("/api/v1/user",myBlog)
app.use("/api/v1/user",allBlogs)
app.use("/api/v1/user",sinUpAsAdmin)
app.use("/api/v1/user",updateAsAdmin)
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"OK"
    })
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})