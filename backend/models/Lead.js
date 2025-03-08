const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    source: { type: String, enum: ["Website", "Referral", "Advertisement", "Walk-in", "Other"], required: true },
    status: {
        type: String,
        enum: [
            "New", "Call Not Connected", "Call Not Answered", "Details Explained",
            "Need a Demo", "Demo Scheduled", "Not Interested",
            "Demo Attended", "Follow-Up for Registration", "Not Interested After Demo",
            "Joined Course", "Payment Pending", "Payment Completed", "Completed"
        ],
        default: "New"
    },
    followUpDate: { type: Date, default: null }, // Follow-up Reminder Date
    notes: [{ message: String, date: { type: Date, default: Date.now } }], // Notes
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", LeadSchema);
