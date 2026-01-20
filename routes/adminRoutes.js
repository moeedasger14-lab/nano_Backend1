const express = require("express");
const router = express.Router();
const courseCtrl = require("../controllers/courseController");
const protect = require("../middlewares/protectRoute");
const User = require("../modals/user");

// Teacher
router.get("/teachers/pending", async (req, res) => {
  const teachers = await User.find({
    role: "teacher",
    status: "pending",
  });
  res.json(teachers);
});

// 🔹 APPROVED TEACHERS
router.get("/teachers/approved", async (req, res) => {
  const teachers = await User.find({
    role: "teacher",
    status: "approved",
  });
  res.json(teachers);
});

// 🔹 PENDING STUDENTS
router.get("/students/pending", async (req, res) => {
  const students = await User.find({
    role: "student",
    status: "pending",
  });
  res.json(students);
});

// 🔹 APPROVED STUDENTS
router.get("/students/approved", async (req, res) => {
  const students = await User.find({
    role: "student",
    status: "approved",
  });
  res.json(students);
});
router.post("/admin/course/approve/:id", async (req, res) => {
  const courseId = req.params.id;
  const course = await CoursesPending.findById(courseId);

  if (!course) return res.status(404).send("Course not found");

  // Move to approved collection
  const approvedCourse = new CoursesApproved({
    teacherId: course.teacherId,
    title: course.title,
    description: course.description,
    status: "approved"
  });
  await approvedCourse.save();
  await CoursesPending.findByIdAndDelete(courseId);

  res.send("Course approved");
});

// Reject course
router.post("/admin/course/reject/:id", async (req, res) => {
  const courseId = req.params.id;
  await CoursesPending.findByIdAndDelete(courseId);
  res.send("Course rejected");
});
module.exports = router;