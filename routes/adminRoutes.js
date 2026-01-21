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
router.patch("/users/:id/approve", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User approved", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ❌ REJECT USER (delete)
 */
router.delete("/users/:id/reject", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User rejected & deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Reject course
router.post("/admin/course/reject/:id", async (req, res) => {
  const courseId = req.params.id;
  await CoursesPending.findByIdAndDelete(courseId);
  res.send("Course rejected");
});
router.get("/users/status/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("role status");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // { role, status }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "fullName email teachingexperience expertise gender"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;