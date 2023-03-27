import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const SkillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: false
    },
    endDate: {
        type: String,
        required: false
    },
    isPresentSkill: {
        type: Boolean,
        default: false,
        required: false
    },
    isLanguage: {
        type: Boolean,
        default: false,
        required: false
    },
    isFormalEducation: {
        type: Boolean,
        default: false,
        required: false
    },
    isWorkExperience: {
        type: Boolean,
        default: false,
        required: false
    },
    isProjectExperience: {
        type: Boolean,
        default: false,
        required: false
    }
});
