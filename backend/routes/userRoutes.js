const express = require("express");
const User = require("../models/User");
const Batch = require("../models/Batch");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


const router = express.Router();

// Get User Profile
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update User Profile
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (password) user.password = password;

        await user.save();
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete User
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/upload-profile-picture/:id", authMiddleware, upload.single("profilePicture"), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.profilePicture = req.file.path; // Cloudinary image URL
        await user.save();

        res.json({ message: "Profile picture updated successfully", profilePicture: user.profilePicture });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const {
            firstName, lastName, email, mobile, address,
            tenthPercentage, twelfthPercentage, degree, degreePercentage, college,
            github, linkedin, resume
        } = req.body;

        if (user.role === "Admin" || user.role === "Instructor") {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.mobile = mobile || user.mobile;
            user.address = address || user.address;
        }

        if (user.role === "Instructor") {
            user.specialization = req.body.specialization || user.specialization;
        }

        if (user.role === "Student") {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.mobile = mobile || user.mobile;
            user.address = address || user.address;
            user.tenthPercentage = tenthPercentage || user.tenthPercentage;
            user.twelfthPercentage = twelfthPercentage || user.twelfthPercentage;
            user.degree = degree || user.degree;
            user.degreePercentage = degreePercentage || user.degreePercentage;
            user.college = college || user.college;
            user.github = github || user.github;
            user.linkedin = linkedin || user.linkedin;
            user.resume = resume || user.resume;
        }

        await user.save();
        res.json({ message: "Profile updated successfully!", user });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
// ✅ GET User Profile - DO NOT TREAT "profile" as an ObjectId!
router.get("/profile", authMiddleware, async (req, res) => {
   
    try {
        console.log("🔍 Fetching profile for user ID:", req.user.id); // ✅ Debugging
       

        // ✅ Fetch user & populate batch details
        const user = await User.findById(req.user.id)
            .populate("batchId", "name selectedCourse courseFee") // ✅ Ensure batchId is populated
            .select("-password"); // Exclude password

        if (!user) {
            console.error("❌ User not found!");
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Print user details to check what’s wrong
        console.log("✅ User Found:", user);

        // ✅ Handle missing batchId
        const batch = user.batchId || { name: "N/A", selectedCourse: "N/A", courseFee: 0 };
        const totalFee = batch.courseFee || 0;
        const paidFee = user.paidFee || 0;
        const dueFee = totalFee - paidFee;

        // ✅ Send response
        res.json({
            ...user.toObject(),
            batch: batch.name,
            course: batch.selectedCourse,
            totalFee,
            paidFee,
            dueFee,
        });

    } catch (error) {
        console.error("❌ Internal Server Error:", error); // ✅ Print full error
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;
