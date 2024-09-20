import mongoose from "mongoose";

const Schema = mongoose.Schema;

const slideSchema = new Schema (
    {
        projectID: { type: String, required: true },
        templateID: { type: String, required: true },
        text_01: { type: String },
        text_02: { type: String },
        text_03: { type: String },
        text_04: { type: String },
        text_05: { type: String },
        text_06: { type: String },
        text_07: { type: String },
        text_08: { type: String },
        text_09: { type: String },
        text_10: { type: String },
    }
);

export default mongoose.model("Slide", slideSchema);