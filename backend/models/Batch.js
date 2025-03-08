const mongoose = require("mongoose");

// const BatchSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     batchType: { type: String, enum: ["Normal", "Premium"], required: true },
//     startDate: { type: String, required: true },
//     endDate: { type: String, required: true },
//     selectedCourse: { type: String, required: true }, // Changed from array to single string
//     courseFee: { type: Number, required: true },
//     classType: { type: String, enum: ["Offline", "Online"], required: true }
// });


const BatchSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Batch Name
    batchType: { type: String, enum: ["Normal", "Premium"], required: true },
    selectedCourse: { type: String, required: true }, // Course Name
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    courseFee: { type: Number, required: true }, // Total Fee
    classType: { type: String, enum: ["Offline", "Online"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Batch", BatchSchema);
