var User = require("../modals/user");

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

      // teacher fields
      expertise,
      teachingExperience,
      degree,
      graduation,
      university,
      ids,
      certification,

      // student fields
      read,
      live,
      class: classLevel
    } = req.body;

    // check duplicate email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // role-based status
    let status = "pending";
    if (role === "admin" || role === "student") {
      status = "approved";
    }

    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      gender,
      country,
      role,
      status,

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
              city: live,
              classLevel
            }
          : undefined
    });

    res.status(201).json({
      message:
        role === "teacher"
          ? "Signup successful. Await admin approval."
          : "Signup successful",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role === "teacher" && user.status !== "approved") {
      return res.status(403).json({ message: "Await admin approval" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};