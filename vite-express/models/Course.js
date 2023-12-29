import mongoose from "mongoose";
const { model, Schema } = mongoose;

const courseSchema = new Schema({
  courseid: Number,
  code: String,
  title: String,
  crhr: Number,
  semester: Number,
});

export const Course = model("Course", courseSchema);
