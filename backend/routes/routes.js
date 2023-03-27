import {
    add,
    getAll,
    getById,
    getByName,
    updateByName,
    updateById,
    deleteByName,
    deleteById
} from "../controllers/controllers";

const routeOptions = ["contact", "experience", "project", "skill", "user"];

const routes = (app) => {
    routeOptions.forEach((rt) => {
        app.route(`/${rt}`).get(getAll).post(add);
        app.route(`/${rt}/name/:Name`)
            .get(getByName)
            .put(updateByName)
            .delete(deleteByName);
        app.route(`/${rt}/id/:Id`)
            .get(getById)
            .put(updateById)
            .delete(deleteById);
    });
    // app.route("/contact").get(getAll).p~ost(add);
    // app.route("/contact/name/:Name")
    //     .get(getByName)
    //     .put(updateByName)
    //     .delete(deleteByName);
    // app.route("/contact/id/:Id")
    //     .get(getById)
    //     .put(updateById)
    //     .delete(deleteById);

    // /* EXPERIENCE ROUTES */
    // app.route("/experience").get(getAll).post(add);
    // app.route("/experience/name/:Name")
    //     .get(getByName)
    //     .put(updateByName)
    //     .delete(deleteByName);
    // app.route("/experience/id/:Id")
    //     .get(getById)
    //     .put(updateById)
    //     .delete(deleteById);

    // /* PROJECT ROUTES */
    // app.route("/project").get(getAll).post(add);
    // app.route("/project/name/:Name")
    //     .get(getByName)
    //     .put(updateByName)
    //     .delete(deleteByName);
    // app.route("/project/id/:Id")
    //     .get(getById)
    //     .put(updateById)
    //     .delete(deleteById);

    // /* SKILL ROUTES */
    // app.route("/skill").get(getAll).post(add);
    // app.route("/skill/name/:Name")
    //     .get(getByName)
    //     .put(updateByName)
    //     .delete(deleteByName);
    // app.route("/skill/id/:Id").get(getById).put(updateById).delete(deleteById);

    // /* USER ROUTES */
    // app.route("/user").get(getAll).post(add);
    // app.route("/user/name/:Name")
    //     .get(getByName)
    //     .put(updateByName)
    //     .delete(deleteByName);
    // app.route("/user/id/:Id").get(getById).put(updateById).delete(deleteById);
};

export default routes;
