import { Router } from "express";

import UsersRouter from "./users.routes";
import SessionsRouter from "./sessions.routes";
import BudgetsRouter from "./budgets.routes";

const routes = Router();

routes.use("/users", UsersRouter);
routes.use("/sessions", SessionsRouter);
routes.use("/budgets", BudgetsRouter);

export default routes;
