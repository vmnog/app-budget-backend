import { EntityRepository, Repository } from "typeorm";

import AppError from "../errors/AppError";

import Budget from "../models/Budget";

interface Request {
    budget_id?: string;
    user_id?: string;
}

@EntityRepository(Budget)
class BudgetRepository extends Repository<Budget> {
    async list({ user_id }: Request): Promise<Budget[]> {
        const budgets = await this.find({
            where: {
                user_id,
            },
        });

        if (!user_id) {
            throw new AppError("User is missing", 400);
        }

        return budgets;
    }

    async show({ budget_id }: Request): Promise<Budget> {
        const budget = await this.findOne({
            where: {
                id: budget_id,
            },
        });

        if (!budget) {
            throw new AppError("Budget not found", 404);
        }

        return budget;
    }
}

export default BudgetRepository;
