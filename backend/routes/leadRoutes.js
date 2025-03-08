const express = require("express");
const Lead = require("../models/Lead");
const authMiddleware = require("../middleware/authMiddleware");



const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");


const upload = multer({ dest: "uploads/" });


const router = express.Router();

// ✅ Create a New Lead
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { name, email, phone, source } = req.body;

        const existingLead = await Lead.findOne({ email });
        if (existingLead) return res.status(400).json({ message: "Lead already exists" });

        const newLead = new Lead({ name, email, phone, source });
        await newLead.save();

        res.status(201).json({ message: "Lead added successfully", lead: newLead });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Get All Leads
router.get("/", authMiddleware, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Update Lead Status & Follow-Up Date
router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const { status, followUpDate, notes } = req.body;
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });

        if (status) lead.status = status;
        if (followUpDate) lead.followUpDate = new Date(followUpDate);
        if (notes) lead.notes.push({ message: notes });

        await lead.save();
        res.json({ message: "Lead updated successfully", lead });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Delete a Lead
router.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/bulk-upload", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const leads = [];
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on("data", (row) => {
                leads.push(row);
            })
            .on("end", async () => {
                fs.unlinkSync(req.file.path); // Delete file after processing

                let newLeads = [];
                for (let lead of leads) {
                    const existingLead = await Lead.findOne({ email: lead.email });
                    if (!existingLead) {
                        newLeads.push({
                            name: lead.name,
                            email: lead.email,
                            phone: lead.phone,
                            source: lead.source || "Other",
                            status: "New",
                        });
                    }
                }

                if (newLeads.length > 0) {
                    await Lead.insertMany(newLeads);
                    res.json({ message: `${newLeads.length} Leads Imported Successfully`, importedLeads: newLeads });
                } else {
                    res.json({ message: "No new leads to import" });
                }
            });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
