import authMiddelwear from "./auth.middelwear";

const adminMiddelwear = (req, res, next) => {
    const user = req.body.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { id } = user;
    if (!id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    if (user.admin !== true) {
        return res.status(403).json({ message: "Forbidden" });
    }
    req.body.user.admin =Admin;
    console.log("Admin",Admin);
    next();

}