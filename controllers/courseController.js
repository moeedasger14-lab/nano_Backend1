const Course = require("../modals/course");

// TEACHER creates course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      teacherId: req.user._id, // coming from auth middleware
      status: "pending",
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ADMIN sees pending courses
exports.getPendingCourses = async (req, res) => {
  const courses = await Course.find({ status: "pending" })
    .populate("teacherId", "fullName");

  res.json(courses);
};

// ADMIN approves course
exports.approveCourse = async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, {
    status: "approved",
  });

  res.json({ message: "Course approved" });
};

// ADMIN rejects course
exports.rejectCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course rejected" });
};

// TEACHER sees own courses
exports.getTeacherCourses = async (req, res) => {
  const courses = await Course.find({ teacherId: req.user._id });
  res.json(courses);
};

// STUDENTS see approved courses

exports.getApprovedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "approved" })
      .populate("teacherId", "name");

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};