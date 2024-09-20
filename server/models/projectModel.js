import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema (
    {
        name: { type: String, required: true},
        slideCount: {type: Number, required: true}
    }
);

export default mongoose.model("Project", projectSchema);