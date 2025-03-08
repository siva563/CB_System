const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        console.log("🔑 Checking for token...");
        

        const token = req.headers.authorization?.split(" ")[1]; // ✅ Extract token

        if (!token) {
            console.error("❌ No token provided!");
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Decoded:", decoded);

        req.user = await User.findById(decoded.id).select("-password");
       console.log("✅ User Found in DB:", req.user.id);

        if (!req.user) {
            console.error("❌ User not found in DB!");
            return res.status(401).json({ message: "Unauthorized - User Not Found" });
        }

        next();
    } catch (error) {
        console.error("❌ Authentication Error:", error);
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
