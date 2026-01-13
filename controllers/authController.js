var User = require("../modals/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      gender,
      country,
      role,
      adminVerify,

      // teacher fields
      expertise,
      teachingExperience,
      degree,
      graduationCity: graduation,
      university,
      studentId: ids,
      certification,

      // student fields
      studyType: read,
      City: live,
      class: classLevel,
    } = req.body;

    // 🔒 Duplicate email check
   // const exists = await User.findOne({ email });
   // if (exists) {
  //    return res.status(400).json({ message: "Email already exists" });
  //  }
if (role === "admin") {
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    return res.status(403).json({ message: "Admin already exists" });
  }
}
    // 🔐 ADMIN CHECK
    if (role === "admin") {
      if (email !== "moeedasger4@gmail.com") {
        return res.status(403).json({ message: "Not authorized as admin" });
      }

      if (adminVerify !== "admin456") {
        return res.status(403).json({ message: "Invalid admin verify code" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      country,
      role,

      status: role === "admin" ? "approved" : "pending",
      adminProfile: role === "admin" ? { adminVerify } : undefined,
      teacherProfile:
        role === "teacher"
          ? {
              expertise,
              teachingExperience,
              degree,
              graduationCity: graduation,
              university,
              studentId: ids,
              certification
            }
          : undefined,

      studentProfile:
        role === "student"
          ? {
             studyType: read,
              City: live,
              class: classLevel,
            }
          : undefined
    });

    res.status(201).json({
      message:
        role === "admin"
          ? "Admin account created"
          : "Signup successful. Await admin approval.",
      user: {
        id: user._id,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      id: user._id,
      role: user.role,
      status: user.status,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};