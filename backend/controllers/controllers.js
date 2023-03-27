import mongoose from "mongoose";
import {ContactSchema} from "../models/contactModel";
import {ExperienceSchema} from "../models/experienceModel";
import {ProjectSchema} from "../models/projectModel";
import {SkillSchema} from "../models/skillsModel";
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
    console.log("req.route.path: ", req.route.path, "\nModel: ", Model);

    const newRec = new Model(req.body);

    const record = await newRec
        .save()
        .then((Model) => res.json(Model))
        .catch((err) => res.send(err.message));

    console.log("added: ", record);

    return record;
};

export const getAll = async (req, res) => {
    setType(req.route.path);

    const records = await Model.find({})
        .then(res.json(Model))
        .catch((err) => res.send(err.message));

    console.log("found all: ", records);

    return records;
};

export const getById = async (req, res) => {
    setType(req.route.path);
    const record = await Model.findById(
        {
            _id: req.params.Id
        },
        req.body,
        {new: true}
    )
        .then(res.json(Model))
        .catch((err) => res.send(err.message));

    console.log("found by id: ", record);

    return record;
};

export const getByName = async (req, res) => {
    setType(req.route.path);
    const record = await Model.findOne(
        {
            name: req.params.Name
        },
        req.body,
        {new: true}
    )
        .then(res.json(Model))
        .catch((err) => res.send(err.message));

    console.log("found by name: ", record);

    return record;
};

export const updateByName = async (req, res) => {
    setType(req.route.path);
    const record = await Model.findOneAndUpdate(
        {
            name: req.params.Name
        },
        req.body,
        {new: true}
    )
        .then(res.json(Model))
        .catch((err) => res.send(err.message));

    console.log("updated by name: ", record);

    return record;
};

export const updateById = async (req, res) => {
    setType(req.route.path);
    const record = await Model.findOneAndUpdate(
        {
            _id: req.params.Id
        },
        req.body,
        {new: true}
    )
        .then(res.json(Model))
        .catch((err) => res.send(err.message));

    console.log("updated by id: ", record);

    return record;
};

export const deleteByName = async (req, res) => {
    const record = await Model.deleteOne({
        name: req.params.Name
    })
        .then(
            res.json({
                message: `successfully deleted ${req.params.Name}`
            })
        )
        .catch((err) => res.send(err.message));

    console.log("deleted by name: ", record);

    return record;
};

export const deleteById = async (req, res) => {
    setType(req.route.path);
    const record = await Model.deleteOne({
        _id: req.params.Id
    })
        .then(
            res.json({
                message: `successfully deleted ${req.params.Id}`
            })
        )
        .catch((err) => res.send(err.message));

    console.log("deleted by id: ", record);

    return record;
};
