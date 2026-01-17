const express = require("express");
const router = express.Router();
const User = require("../modals/user.js");

router.get("/check-status", async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  if (!user) return res.status(404).json({});

  res.json({
    status: user.status,
    user,
  });
});
router.patch("/users/:id/approve", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "approved";
    await user.save();

    res.json({ message: "User approved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Reject user
router.delete("/users/:id/reject", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User rejected and removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/teachers/approved", async (req, res) => {
  const teachers = await User.find({
    role: "teacher",
    status: "approved",
  });
  res.json(teachers);
});

// DELETE teacher on logout
router.delete("/teacher-logout/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;

    // delete courses created by teacher
    await Course.deleteMany({ teacher: teacherId });

    // delete teacher
    await User.findByIdAndDelete(teacherId);

    // optional: save notification
    await Notification.create({
      message: "Teacher logged out and was removed",
    });

    res.json({ message: "Teacher removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/students/pending", async (req, res) => {
  const students = await User.find({
    role: "student",
    status: "pending",
  });

  res.json(students);
});
router.get("/notifications", async (req, res) => {
  const pendingCount = await User.countDocuments({ status: "pending" });
  res.json({ pendingCount });
});
router.get("/students/approved", async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
      status: "approved",
    });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/users/status/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("status role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: user.status,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
