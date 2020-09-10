import { Router } from "express";

import UserRouter from "./users.routes";
import SessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/users", UserRouter);
routes.use("/sessions", SessionsRouter);

export default routes;
