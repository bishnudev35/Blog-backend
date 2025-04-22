import Router from 'express';
import prisma from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwtsign from '../utils/jwt.js';
const router=Router();

router.post("/signAsAdmin",async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
            select: { email: true,
                     admin:true,
             }
        }); 
        if (existingUser && existingUser.admin === true) {
            return res.status(400).json({ message: " Admin already exists" });
        }else if(existingUser && existingUser.admin === false) {
            return res.status(400).json({ message: " User already exists but not as a admin!" });
        }
        const hasPassword = await bcrypt.hash(password, 10);
        const newAdmin = await prisma.user.create({
            data: {
                name,
                email,
                password:hasPassword,
                admin: true
            }
        })
           const token = jwtsign(newAdmin, process.env.JWT_SECRET);
        if (!newAdmin) {
            return res.status(400).json({ message: "Admin user is not created" });
        }
        return res.status(201).json({
            message: "Admin user is created successfully!",user:{
                name: newAdmin.name,
                email: newAdmin.email,
                admin: newAdmin.admin
            },token});
    } catch (error) {
        res.status(500).json({
            "message": "admin  user is not created!",
            error: error.message})
        
    }
})
export default router;