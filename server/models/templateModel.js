import mongoose from "mongoose";

const Schema = mongoose.Schema;

const templateSchema = new Schema (
    {
        name: { type: String, required: true }
    }
);

export default mongoose.model("Template", templateSchema);