import { useNavigate } from "react-router-dom";
import "./BudgetCard.css";

const BudgetCard = ({ jwt, id, name, total, spent, button, progressBar }) => {
    let remaining = total - spent;
    let progress = spent / total;

    const navigate = useNavigate();

    return (
        <div className="card-container">
            <div className="card-text">
                <h3 className="card-heading">{name}</h3>
                <span className="card-total">R{total} Budgeted</span>
            </div>
            {
                progressBar && (
                    <>
                        <div className="card-bar">
                            <progress className="progress-bar" value={progress} />
                        </div>
                        <div className="card-amounts">
                            <span className="card-amount">R{spent} spent</span>
                            <span className="card-amount">R{remaining} remaining</span>
                        </div>
                        {
                            (remaining < 0) && (
                                <div className="card-over">
                                    <span className="text-over">You are over budget!</span>
                                </div>
                            )
                        }
                    </>
                )
            }
            {
                button && (
                    <div className="card-button">
                        <button className="card-button-text" onClick={() => {
                            navigate(`/budget/${id}`, { state: { jwt, name, total, spent } })
                        }}>View More</button>
                    </div>
                )
            }
        </div>
    )
}

export default BudgetCard; 