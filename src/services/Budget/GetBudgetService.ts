import { getRepository } from "typeorm";

import Budget from "../../models/Budget";

import AppError from "../../errors/AppError";

interface Request {
    user_id: string;
    budget_id: string;
}

class GetBudgetService {
    async execute({
        user_id,
        budget_id,
    }: Request): Promise<Budget | undefined> {
        const budgetsRepository = getRepository(Budget);

        const budget = await budgetsRepository.findOne({
            where: {
                user_id,
                id: budget_id,
            },
        });

        if (!budget) throw new AppError("Budget not found", 404);

        return budget;
    }
}

export default GetBudgetService;
