interface BudgetProps {
    dev_amount: number;
    designer_amount: number;
    sm_amount: number;
    po_amount: number;
    days_amount: number;
}

interface FormulaProps {
    amount: number;
    price: number;
    percent: number;
}

const handleCalculatePrice = ({
    dev_amount,
    designer_amount,
    sm_amount,
    po_amount,
    days_amount,
}: BudgetProps) => {
    // Separates cargos by quantity, price and percentage
    const cargos = [
        { amount: dev_amount, price: 1000, percent: 0.15 },
        {
            amount: designer_amount,
            price: 1000,
            percent: 0.05,
        },
        { amount: sm_amount, price: 900, percent: 0.12 },
        { amount: po_amount, price: 1500, percent: 0.1 },
    ];

    // Calculates each cargo
    const handleUseFormula = ({
        amount,
        price,
        percent,
    }: FormulaProps): number => {
        let total = amount * price;
        total += total * percent;
        return total * days_amount;
    };

    // Makes an array with results of each cargo
    let results = cargos.map(({ amount, percent, price }) =>
        handleUseFormula({ amount, price, percent })
    );

    // Use reduce to sum all the arrays results in one and sum with the days price and amount
    const total = results.reduce((a, b) => a + b, 200 * days_amount);

    return total;
};

export default handleCalculatePrice;
