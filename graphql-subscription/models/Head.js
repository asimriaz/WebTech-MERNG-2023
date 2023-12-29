import mongoose from "mongoose"
const { model, Schema } = mongoose;

const headSchema = new Schema({
    hid: Number,
    headname: String,
    total: Number,
});

export const Head = model("Head", headSchema);
