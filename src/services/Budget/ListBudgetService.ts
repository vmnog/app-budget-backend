import { getRepository } from "typeorm";

import Budget from "../../models/Budget";

interface Request {
    user_id: string;
}

class ListBudgetService {
    async execute({ user_id }: Request): Promise<Budget[]> {
        const budgetsRepository = getRepository(Budget);

        const budgets = await budgetsRepository.find({
            where: {
                user_id,
            },
        });

        return budgets;
    }
}

export default ListBudgetService;
