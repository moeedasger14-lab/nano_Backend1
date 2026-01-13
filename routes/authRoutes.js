cconst express = require("express");
const router = express.Router();

// ✅ destructure functions
const { signup, getMe } = require("../controllers/authController");

// routes
router.post("/signup", signup);
router.get("/me", getMe);

module.exports = router;