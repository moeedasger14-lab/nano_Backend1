const express = require("express");
const router = express.Router();
const courseCtrl = require("../controllers/courseController");
const protect = require("../middlewares/protectRoute");


// Teacher
router.post("/", protect, courseCtrl.createCourse);
router.get("/teacher", protect, courseCtrl.getTeacherCourses);

// Admin
router.get("/pending", protect, courseCtrl.getPendingCourses);
router.patch("/:id/approve", protect, courseCtrl.approveCourse);
router.delete("/:id/reject", protect, courseCtrl.rejectCourse);

// Student
router.get("/approved", courseCtrl.getApprovedCourses);

module.exports = router;