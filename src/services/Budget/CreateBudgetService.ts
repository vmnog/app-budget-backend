import { getRepository, getConnection } from "typeorm";

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

interface BudgetResponse {}

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

        const { id } = await budgetsRepository.save(budget);

        const total_price = handleCalculatePrice(budget);

        // Includes total price calculated
        await getConnection()
            .createQueryBuilder()
            .update(Budget)
            .set({ total_price })
            .where("id = :id", { id })
            .execute();

        return { ...budget, total_price };
    }
}

export default CreateBudgetService;
