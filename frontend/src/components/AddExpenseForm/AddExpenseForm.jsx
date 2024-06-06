import { useState } from "react";

import "./AddExpenseForm.css";

import { createExpenseItem } from "../../api/api.jsx"

const AddExpenseForm = ({ budgetName, categories, jwt, budgetId, addExpense }) => {
    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState(categories[0].id);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createExpenseItem(jwt, budgetId, categoryId, name, amount).then((response) => {
            addExpense(response);
            setName("");
            setAmount("");
        })
    }

    return (
        <div className="expense-container">
            <h2 className="expense-header">Add New <span className="name-span">{budgetName}</span> Expense</h2>
            <form className="expense-form" onSubmit={handleSubmit}>
                <div className="expense-inputs-container">
                    <div className="expense-row">
                        <div className="expense-input-container">
                            <label className="expense-label">Expense Name</label>
                            <input
                                className="expense-input"
                                value={name}
                                title="Please only enter letters or numbers"
                                pattern="[a-zA-Z0-9 ]*"
                                type="text"
                                placeholder="e.g. Eggs"
                                required
                                maxLength={100}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div className="expense-input-container">
                            <label className="expense-label">Amount</label>
                            <input
                                className="expense-input"
                                value={amount}
                                type="number"
                                step="0.1"
                                min={1}
                                max={99999999}
                                placeholder="e.g. R50.00"
                                required
                                inputMode="decimal"
                                onChange={(e) => { setAmount(e.target.value) }}
                            />
                        </div>
                    </div>

                    <div className="expense-row">
                        <div className="expense-input-container">
                            <label className="expense-label">Category</label>
                            <select
                                className="expense-select"
                                required
                                onChange={(e) => {
                                    const selectedCategory = categories.find(
                                        (categoryItem) => categoryItem.name === e.target.value
                                    )
                                    setCategory(e.target.value);
                                    setCategoryId(selectedCategory.id);
                                }}
                            >
                                {categories.map(
                                    (categoryItem, index) => {
                                        return (
                                            <option key={index} >
                                                {categoryItem.name}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="expense-button-container">
                    <button className="expense-button" type="submit">Add Expense</button>
                </div>
            </form>
        </div>
    );
};

export default AddExpenseForm;
