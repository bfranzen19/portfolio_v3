import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ExperienceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    bullets: {
        type: [String],
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    isPresent: {
        type: Boolean,
        required: false,
        default: false
    }
});
