const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    coursename: {
      type: String,
      required: true,
    },

    // 🔑 link course to teacher
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    expertise: {
      type: String,
      enum: ["math", "urdu", "english"],
      required: true,
    },

    duration: {
      type: String,
      enum: [
        "3 weeks",
        "1 month",
        "3 months",
        "5 months",
        "6 months",
        "10 months",
        "12 months",
        "1 year",
        "2 years",
        "3 years",
      ],
      required: true,
    },

    coursePrice: {
      type: Number,
      required: true,
    },

    pricestatus: {
      type: String,
      enum: ["Negotiable", "Fixed"],
      required: true,
    },

    coursestartdate: {
      type: Date,
      required: true,
    },

    courseend: {
      type: Date,
      required: true,
    },

    offers: {
      type: String,
      enum: ["5%","10%", "20%", "30%", "40%", "50%", "no offer"],
      default: "no offer",
    },

    classdays: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Full Week",
        "Saturday and Sunday",
      ],
      required: true,
    },

    timing: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    teachernames: {
      type: String,
      required: true,
    },

    teacherage: {
      type: String,
      required: true,
    },

    teachergender: {
      type: String,
      required: true,
    },

    classcapacity: {
      type: String,
      enum: [
        "5 students",
        "10 students",
        "15 students",
        "20 students",
        "25 students",
        "30 students",
        "35 students",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);