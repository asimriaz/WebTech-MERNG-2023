import mongoose from "mongoose"
const { model, Schema } = mongoose;

const markSchema = new Schema({
    mid: Number,
    regno: String,
    hid: Number,
    marks: Number,
    // student: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Student",
    // },
    // head: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Head",
    // },
});

// markSchema.pre("find", function () {
//   this.populate({ path: "student", select: "name -_id" });
//   this.populate({ path: "head", select: { headname: 1, total: 1, _id: 0 } });
// });

export const Mark = model("Mark", markSchema);
