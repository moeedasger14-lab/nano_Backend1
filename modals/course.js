const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    coursename:{
        type: String,
        required: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coursetype:{
  type: String,
  enum:["Mathematics","Science","History","English","Physical",
    "Uidu","Chemistry","Boilogy","Computer","Geography","Englishs","Urdus",
    "Spanish","French","German","Arabic","Balochi","Punjabi","Chinese","Russian",
    "Frontend","Backend","Full Stack","Mobile Development","Data Science",
    "Machine Learning","Artificial Intalligence","Cyber Security","Cloud Computing",
    "DevOps","Blockchain","Game Development","UI/Ux Design","Digital Marketing",
    "Internet of Things","Augmented Reality","Virtual Reality","Phython","JavaScript",
    "Java","C++","C#","ruby","PHP","React","Augular","Vue","Node.js","Express.js",
    "MongoDB","PostgreSQL"
  ],
  required: true,
    },
 duration:{
  type: String,
  enum:["3 weeks","1 month","3 months","5 months","6 months",
    "10 months","12 months","1 year","2 years","3 years"],
    required: true,
 },
 coursePrice:{
type: Number,
required: true,
 },
 pricestatus:{
type: String,
required: true,
enum:["Negociable","Fixed"],
 },
 coursestartsate:{
 type: Date,
 required: true,

 },
 courseend:{
type: Date,
required: true,
 },
 offers:{
type: String,
default: "0",
enum:["10%","20%","30%","40%","50%","no offer"],
 },
 classdays:{
type: String,
enum:["Tuesday","Monday","Wednesday","Thursday","Friday",
    "Saturday","Sunday","Full Week","Saturday and Sunday"],
    required: true,
 },
 timing:{
type: String,
    required: true,
 },
 description:{
type: String,
required: true,
 },
 teachernames:{
type: String,
required: true,
 },
 teacherage:{
    type: String,
    enum:["20","25","30","35","40","22","24","28","32","34","38","21"],
    required: true,
 },
 teachergender:{
type: String,
required: true,
 },
 teacherexperience:{
type: String,
required: true,
 },
 classcapacity:{
type: String,
enum:["5 students","10 students","15 students","20 students","25 students","30 students","35 students"],
required: true,
 },

    status: {
      type: String,
      enum: ["pending","approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);