import { getRepository } from "typeorm";

import Budget from "../../models/Budget";

import handleCalculatePrice from "../../utils/CalculateBudgetPrice";

interface Request {
    user_id: string;
    dev_amount: number;
    designer_amount: number;
    sm_amount: number;
    po_amount: number;
    days_amount: number;
}

interface BudgetResponse {
    budget: Budget;
    total: number;
}

class CreateBudgetService {
    async execute({
        user_id,
        dev_amount,
        designer_amount,
        sm_amount,
        po_amount,
        days_amount,
    }: Request): Promise<BudgetResponse> {
        const budgetsRepository = getRepository(Budget);

        const budget = {
            user_id,
            dev_amount,
            designer_amount,
            sm_amount,
            po_amount,
            days_amount,
        };

        await budgetsRepository.create(budget);

        await budgetsRepository.save(budget);

        const total = handleCalculatePrice(budget);

        return { ...budget, total };
    }
}

export default CreateBudgetService;
