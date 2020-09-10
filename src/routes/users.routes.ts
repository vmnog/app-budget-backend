import { Router } from "express";

import CreateUserService from "../services/CreateUserService";

const UserRouter = Router();

UserRouter.post("/", async (request, response) => {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

export default UserRouter;
