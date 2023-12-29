import mongoose from "mongoose"
const { model, Schema } = mongoose;

const studentSchema = new Schema({
    regno: String,
    name: String,
    // marks: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Mark",
    //   },
    // ],
});

export const Student = model("Student", studentSchema);
