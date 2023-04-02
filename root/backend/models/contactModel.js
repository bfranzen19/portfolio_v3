import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    intro: {
        type: [String],
        required: true
    },
    address: {
        type: String,
        required: false
    }
});
