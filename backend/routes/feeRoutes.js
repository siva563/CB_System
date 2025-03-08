const express = require("express");
const Fee = require("../models/Fee");
const User = require("../models/User");
const Batch = require("../models/Batch");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get All Students with Fee Details
router.get("/students", authMiddleware, async (req, res) => {
    try {
        const fees = await Fee.find().populate("studentId batchId");

        // Transform data for frontend
        const studentFees = fees.map(fee => ({
            id: fee._id,
            studentName: fee.studentId.name,
            batchName: fee.batchId.name,
            totalFee: fee.totalAmount,
            paidFee: fee.paidAmount,
            pendingFee: fee.pendingAmount,
            notes: fee.notes,
            reminderSent: fee.reminderSent
        }));

        res.json(studentFees);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Update Fee Details (Partial Payments, Notes, Reminder)
// router.put("/update/:id", authMiddleware, async (req, res) => {
//     try {
//         const { paidAmount, notes } = req.body;
//         const fee = await Fee.findById(req.params.id);
//         if (!fee) return res.status(404).json({ message: "Fee record not found" });

//         fee.paidAmount = paidAmount;
//         fee.notes = notes;
//         await fee.save();

//         res.json({ message: "Fee updated successfully", fee });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// ✅ Send Payment Reminder
router.put("/reminder/:id", authMiddleware, async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id);
        if (!fee) return res.status(404).json({ message: "Fee record not found" });

        fee.reminderSent = true;
        await fee.save();

        res.json({ message: "Reminder sent successfully", fee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
        const fees = await Fee.find().populate("studentId batchId");

        // Filter out records where studentId or batchId is null
        const validFees = fees.filter(fee => fee.studentId && fee.batchId);

        res.json(validFees);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const { totalAmount, paidAmount, notes } = req.body;
        const fee = await Fee.findById(req.params.id);
        if (!fee) return res.status(404).json({ message: "Fee record not found" });

        fee.totalAmount = totalAmount || fee.totalAmount;
        fee.paidAmount = paidAmount || fee.paidAmount;
        fee.pendingAmount = fee.totalAmount - fee.paidAmount; // ✅ Auto-update pending amount
        fee.notes = notes || fee.notes;

        await fee.save();
        res.json({ message: "Fee updated successfully", fee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



module.exports = router;
