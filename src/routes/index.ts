import { Router } from "express";

import UserRoute from "./users.routes";

const routes = Router();

routes.use("/users", UserRoute);

export default routes;
