import { Router } from "express";
import { getCustomRepository } from "typeorm";

import ensureAthenticated from "../middlewares/ensureAuthenticated";

import CreateBudgetService from "../services/Budget/CreateBudgetService";

import BudgetRepository from "../repositories/BudgetRepository";

const BudgetsRouter = Router();

BudgetsRouter.use(ensureAthenticated);

BudgetsRouter.post("/", async (request, response) => {
    const {
        dev_amount,
        designer_amount,
        sm_amount,
        po_amount,
        days_amount,
    } = request.body;

    const createBudget = new CreateBudgetService();

    const budget = await createBudget.execute({
        user_id: request.user.id,
        dev_amount,
        designer_amount,
        sm_amount,
        po_amount,
        days_amount,
    });

    return response.json(budget);
});

BudgetsRouter.get("/", async (request, response) => {
    const budgetRepository = getCustomRepository(BudgetRepository);

    const budgets = await budgetRepository.list({ user_id: request.user.id });

    return response.json(budgets);
});

BudgetsRouter.get("/:budget_id", async (request, response) => {
    const { budget_id } = request.params;

    const budgetRepository = getCustomRepository(BudgetRepository);

    const budget = await budgetRepository.show({ budget_id });

    return response.json(budget);
});

export default BudgetsRouter;
