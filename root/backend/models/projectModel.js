import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gifUrl: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
        required: true
    },
    siteUrl: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        default: undefined,
        required: false
    },
    classNames: {
        type: [String],
        default: undefined,
        required: false
    }
});
