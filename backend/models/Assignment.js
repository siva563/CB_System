const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Overdue"], default: "Pending" },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
