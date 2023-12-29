import mongoose from "mongoose"
import { Student } from "./Student.js"
import { Mark } from "./Mark.js"
import { Grade } from "./Grade.js"
import { Head } from "./Head.js"

(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/recapsheet`);
})();

export const db = {
    Student,
    Mark,
    Grade,
    Head,
};
