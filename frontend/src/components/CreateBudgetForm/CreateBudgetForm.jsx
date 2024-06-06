import "./CreateBudgetForm.css";

import { useState } from "react";

import { createBudget } from "../../api/api.jsx"

const CreateBudgetForm = ({ jwt, addBudget }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (amount <= 0) {
            setError("Amount must be greater than 0");
        }
        else {
            setError(undefined);
            try {
                await createBudget(jwt, name, amount).then((response) => {
                    addBudget(response);
                    setAmount("");
                    setName("");
                })
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className="budget-container">
            <h2 className="budget-header">Create Budget</h2>
            <form className="budget-form" onSubmit={handleSubmit}>
                <div className="budget-inputs-container">
                    <div className="budget-input-container">
                        <label className="budget-label">Budget Name</label>
                        <input
                            className="budget-input"
                            value={name}
                            title="Please only enter letters or numbers"
                            pattern="[a-zA-Z0-9 ]*"
                            minLength={1}
                            onChange={(e) => { setName(e.target.value) }}
                            maxLength={100}
                            type="text"
                            placeholder="e.g. June 2024"
                            required
                        />
                    </div>
                    <div className="budget-input-container">
                        <label className="budget-label">Amount</label>
                        <input
                            className="budget-input"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value) }}
                            type="number"
                            min="1"
                            max={99999999}
                            step="0.01"
                            placeholder="e.g. R1250.00"
                            required
                            inputMode="decimal"
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                </div>
                <div className="budget-button-container">
                    <button className="budget-button" type="submit">Create Budget</button>
                </div>
            </form>
        </div>
    );
};

export default CreateBudgetForm;
