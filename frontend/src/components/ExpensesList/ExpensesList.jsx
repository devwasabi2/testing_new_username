import "./ExpensesList.css"

import { deleteExpenseItem } from "../../api/api";

const ExpensesList = ({ expenseList, jwt, deleteExpense }) => {

    return (
        <div className="expenses-container">
            <div className="expenses-list">
                {expenseList.length > 0 && (
                    <div className="list-row">
                        <div className="list-item" >
                            <h3>Name</h3>
                        </div>
                        <div className="list-item">
                            <h3>Price</h3>
                        </div>
                        <div className="list-item">
                            <h3>Category</h3>
                        </div>
                        <div className="list-item">
                            <h3>Delete</h3>
                        </div>
                    </div>
                )}
                {
                    expenseList.map((expense, index) => (
                        <div className="list-row" key={index}>
                            <div className="list-item">{expense.name}</div>
                            <div className="list-item">{expense.price}</div>
                            <div className="list-item">{expense.category.name}</div>
                            <div className="list-item"><span className="trash-can" onClick={async () => {
                                await deleteExpenseItem(jwt, expense.id).then(() => {
                                    deleteExpense(expense.id);
                                })
                            }}>🗑️</span></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ExpensesList;