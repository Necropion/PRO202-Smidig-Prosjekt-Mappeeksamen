import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        password: { type: String },
    },
);

export default mongoose.model("Admin", adminSchema);