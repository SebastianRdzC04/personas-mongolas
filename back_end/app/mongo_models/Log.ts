import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const logPersonSchema = new Schema({
    userId: Number,
    personId: Number,
    action: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('LogPerson', logPersonSchema);