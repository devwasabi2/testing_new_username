import { useLoaderData, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Budget.css";

import ExpensesList from "../../components/ExpensesList/ExpensesList.jsx";
import BudgetCard from "../../components/BudgetCard/BudgetCard";
import AddExpenseForm from "../../components/AddExpenseForm/AddExpenseForm.jsx";

import { getAllExpenses, getAllCategories } from "../../api/api.jsx"

export const budgetLoader = ({ params }) => {
    return params.id;
}

const Budget = () => {
    const [categoryArray, setCategoryArray] = useState();
    const [budgetExpenses, setBudgetExpenses] = useState([]);
    const [spent, setSpent] = useState(0);

    const id = useLoaderData();

    const location = useLocation();
    const { jwt, name, total } = location.state;

    const addExpense = (newExpense) => {
        setBudgetExpenses((prevBudgetExpenses) => [...prevBudgetExpenses, newExpense]);
        setSpent(spent + newExpense.price);
    }

    const deleteExpense = (expenseId) => {
        const newExpenses = budgetExpenses.filter((expense) => expense.id !== expenseId);
        const newTotal = newExpenses.reduce((acc, current) => acc + current.price, 0);
        setBudgetExpenses(newExpenses);
        setSpent(newTotal);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                await getAllExpenses(jwt, id).then((response) => {
                    setBudgetExpenses(response);
                    const total = response.reduce((acc, current) => acc + current.price, 0);
                    setSpent(total);
                })
                await getAllCategories(jwt).then((categories) => {
                    setCategoryArray(categories);
                })
            } catch (error) {
                console.log(error.message);
            }
        };
        getData();
    }, []);

    return (
        <div className="budget-page-container">
            <div className="budget-header-container">
                <h2><span id="budget-name">{name}</span> Budget</h2>
            </div>
            <div className="budget-cards-container">
                <div className="budget-card-container">
                    <BudgetCard name={name} total={total} spent={spent} button={false} progressBar={true} />
                </div>
                <div className="budget-card-container">
                    {categoryArray && <AddExpenseForm budgetName={name} categories={categoryArray} jwt={jwt} budgetId={id} addExpense={addExpense} />}
                </div>
            </div>
            <div className="budget-list-container">
                <ExpensesList expenseList={budgetExpenses} jwt={jwt} deleteExpense={deleteExpense} />
            </div>
        </div>
    )
}

export default Budget;