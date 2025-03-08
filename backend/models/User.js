const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     mobile: { type: String, required: true },
//     role: {
//         type: String,
//         enum: ["System Admin", "Admin", "Instructor", "Student", "Parent", "Principal", "Reports Viewer"],
//         required: true
//     },
//     profilePicture: { type: String, default: "" }
// });

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     mobile: { type: String, required: true },
//     role: { type: String, enum: ["Admin", "Instructor", "Student"], required: true },
//     batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", default: null }, // ✅ Reference to Batch
// }, { timestamps: true });




const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Instructor", "Student"], required: true },
    profilePicture: { type: String, default: "" },
    address: { type: String, default: "" },

    // ✅ Batch Details
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", default: null },
    paidFee: { type: Number, default: 0 }, // Student's Paid Fee

    // ✅ Instructor-Specific Fields
    specialization: { type: String, default: "" },

    // ✅ Student-Specific Fields
    tenthPercentage: { type: Number, default: null },
    twelfthPercentage: { type: Number, default: null },
    degree: { type: String, default: "" },
    degreePercentage: { type: Number, default: null },
    college: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    resume: { type: String, default: "" },

    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });





UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", UserSchema);
