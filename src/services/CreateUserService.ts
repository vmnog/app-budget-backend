import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../models/User";

import AppError from "../errors/AppError";

interface Request {
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new AppError("Email address already user");
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
