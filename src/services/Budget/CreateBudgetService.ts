import { getRepository } from "typeorm";

import Budget from "../../models/Budget";

interface Request {
    user_id: string;
    dev_amount: number;
    designer_amount: number;
    sm_amount: number;
    po_amount: number;
    days_amount: number;
}

class CreateBudgetService {
    async execute({
        user_id,
        dev_amount,
        designer_amount,
        sm_amount,
        po_amount,
        days_amount,
    }: Request): Promise<Budget> {
        const budgetsRepository = getRepository(Budget);

        const budget = budgetsRepository.create({
            dev_amount,
            designer_amount,
            sm_amount,
            po_amount,
            days_amount,
            user_id,
        });

        await budgetsRepository.save(budget);

        return budget;
    }
}

export default CreateBudgetService;
