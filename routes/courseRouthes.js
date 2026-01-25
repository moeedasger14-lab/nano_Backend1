const express = require("express");
const router = express.Router();
const controller = require("../controllers/courseController");
const protect = require("../middlewares/protectRoute")
const Course = require("../modals/course")
// Teacher
router.post("/create", protect, async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      teacherId: req.user._id, // ✅ CORRECT
      status: "pending",
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/pending", controller.getPendingCourses);
router.get("/approved", controller.getApprovedCourses);

router.patch("/approve/:id", controller.approveCourse);
router.patch("/reject/:id", controller.rejectCourse);

router.get("/teacher", protect, controller.getTeacherCourses);



module.exports = router;