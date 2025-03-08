const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    totalAmount: { type: Number, required: true }, // Batch-wise fee or admin-defined amount
    paidAmount: { type: Number, default: 0 }, // Amount student has paid
    pendingAmount: { type: Number }, // Auto-calculated as totalAmount - paidAmount
    status: { type: String, enum: ["Pending", "Paid", "Partial"], default: "Pending" },
    paymentDate: { type: String },
    notes: { type: String, default: "" }, // Additional admin notes for tracking
    reminderSent: { type: Boolean, default: false } // Track reminders
});

// Auto-calculate pending amount before saving
FeeSchema.pre("save", function (next) {
    this.pendingAmount = this.totalAmount - this.paidAmount;
    this.status = this.pendingAmount === 0 ? "Paid" : this.paidAmount > 0 ? "Partial" : "Pending";
    next();
});

module.exports = mongoose.model("Fee", FeeSchema);
