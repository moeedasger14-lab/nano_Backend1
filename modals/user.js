var mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
     
    },

    phone: String,

    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },

    country: String,

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: true
    },

    // 🔐 Approval system
    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending"
    },
     adminProfile: {
     adminVerify: String,
     },

    // 👨‍🏫 Teacher-only fields
    teacherProfile: {
      expertise: [String],
      teachingExperience: String,
      degree: [String],
      graduationCity: String,
      university: [String],
      studentId: Number,
      certification: Number
    },

    // 🎓 Student-only fields
    studentProfile: {
      studyType: String, // School / College / University
      City: String,
      classLevel: String
    }
  },
  { timestamps: true }
);

module.exports  = mongoose.model("User", userSchema);