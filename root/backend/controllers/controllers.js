import mongoose from "mongoose";
import {ContactSchema} from "../models/contactModel";
import {ExperienceSchema} from "../models/experienceModel";
import {ProjectSchema} from "../models/projectModel";
import {SkillSchema} from "../models/skillModel";
import {UserSchema} from "../models/userSchema";

const Contact = mongoose.model("Contact", ContactSchema);
const Experience = mongoose.model("Experience", ExperienceSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Skill = mongoose.model("Skill", SkillSchema);
const User = mongoose.model("User", UserSchema);

let Model;

const setType = (route) => {
    const path = route.split("/")[1];

    switch (path) {
        case "experience":
            Model = Experience;
            break;
        case "contact":
            Model = Contact;
            break;
        case "project":
            Model = Project;
            break;
        case "skill":
            Model = Skill;
            break;
        case "use":
            Model = User;
            break;
        default:
            throw new Error("No record type found");
    }
};

export const add = async (req, res) => {
    setType(req.route.path);

    // TODO: push into arrays for add and updates

    const newRec = new Model(req.body);
    await newRec
        .save()
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send(err));
};

export const getAll = async (req, res) => {
    setType(req.route.path);

    await Model.find({})
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send(err));
};

export const getById = async (req, res) => {
    setType(req.route.path);

    await Model.findById(
        {
            _id: req.params.Id
        },
        req.body,
        {new: true, returnDocument: "after"}
    )
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send(err));
};

export const getByName = async (req, res) => {
    setType(req.route.path);
    await Model.findOne(
        {
            name: req.params.Name
        },
        req.body,
        {new: true, returnDocument: "after"}
    )
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send(err));
};

export const updateByName = async (req, res) => {
    setType(req.route.path);
    await Model.findOneAndUpdate(
        {
            name: req.params.Name
        },
        req.body,
        {new: true, upsert: true, returnDocument: "after"}
    )
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send(err));
};

export const updateById = async (req, res) => {
    setType(req.route.path);
    await Model.findOneAndUpdate(
        {
            _id: req.params.Id
        },
        req.body,
        {new: true, upsert: true, returnDocument: "after"}
    )
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send(err));
};

export const deleteByName = async (req, res) => {
    await Model.deleteOne({
        name: req.params.Name
    }).catch((err) => res.status(404).send(err));
    res.json([
        {
            message: `successfully deleted ${req.params.Name}`
        }
    ]);
};

export const deleteById = async (req, res) => {
    setType(req.route.path);
    await Model.deleteOne({
        _id: req.params.Id
    }).catch((err) => res.status(404).send(err));
    res.json([
        {
            message: `successfully deleted ${req.params.Id}`
        }
    ]);
};
