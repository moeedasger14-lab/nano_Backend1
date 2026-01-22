const express = require("express");
const router = express.Router();
const User  = reqiure("../modals/user");
// ✅ destructure functions
const { signup, getMe } = require("../controllers/authController");
// GET logged-in user profile
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "fullName gender teacherProfile role status"
  );

  res.json(user);
});
// routes
router.post("/signup", signup);
router.get("/me", getMe);

module.exports = router;