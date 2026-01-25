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


// TEACHER sees own courses
exports.getTeacherCourses = async (req, res) => {
  const courses = await Course.find({ teacherId: req.user._id });
  res.json(courses);
};

// STUDENTS see approved courses

// ADMIN: approve course
exports.approveCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({ message: "Course approved", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: reject course
exports.rejectCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, {
      status: "rejected",
    });

    res.json({ message: "Course rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: pending courses
exports.getPendingCourses = async (req, res) => {
  const courses = await Course.find({ status: "pending" }).populate("teacher");
  res.json(courses);
};

// ADMIN: approved courses
exports.getApprovedCourses = async (req, res) => {
  const courses = await Course.find({ status: "approved" }).populate("teacher");
  res.json(courses);
};