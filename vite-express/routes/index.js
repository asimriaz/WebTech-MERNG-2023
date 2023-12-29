import express from "express";
const router = express.Router();
import { db } from "../models/index.js";
//import ctrlCourse from "../controllers/courseController.js";

router.get("/msg", (req, res) => {
  res.json({ msg: "Hello World" });
});

router.get("/list", async (req, res) => {
  const courses = await db.Course.find().sort("courseid");
  res.status(200).json(courses);
});

router.post("/save", async (req, res) => {
  //const course = req.body;
  const course = await db.Course.findByIdAndUpdate({ _id: req.body._id }, {
    $set: req.body
  }, { new: true });
  res.status(200).json(course);
});

router.get("/course/:id", async (req, res) => {
  const course = await db.Course.findById({ _id: req.params.id });
  res.status(200).json(course);
});

// router.get("/edit", ctrlCourse.getCourseById);
// router.post("/save", ctrlCourse.saveCourse);

export default router;
