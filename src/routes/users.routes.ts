import { Router } from "express";

import CreateUserService from "../services/User/CreateUserService";

const UsersRouter = Router();

UsersRouter.post("/", async (request, response) => {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

export default UsersRouter;
