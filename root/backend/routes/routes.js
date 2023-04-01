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
};

export default routes;
