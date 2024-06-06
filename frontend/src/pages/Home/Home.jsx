import { useNavigate } from "react-router-dom";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

import "./Home.css";

import image from "../../assets/image-1.svg";

import CreateBudgetForm from "../../components/CreateBudgetForm/CreateBudgetForm.jsx";
import BudgetCard from "../../components/BudgetCard/BudgetCard.jsx";

import { getAllBudgets } from "../../api/api.jsx";

const Home = () => {
  const [jwt, setJwt] = useState("");
  const [username, setUsername] = useState("");
  const [userBudgets, setUserBudgets] = useState([]);

  const navigate = useNavigate();

  const addBudget = (newBudget) => {
    setUserBudgets((prevUserBudgets) => [...prevUserBudgets, newBudget]);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens === undefined) {
          navigate("/login");
        }
        else {
          const token = session.tokens.accessToken.toString();
          if (token) {
            const userCredentails = await getCurrentUser();
            setUsername(userCredentails.username);
            setJwt(token);
            const data = await getAllBudgets(token);
  
            setUserBudgets(data);
          } else {
            navigate("/login");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);

  return (
    <div>
      <div className="create-container">
        {jwt && <CreateBudgetForm jwt={jwt} addBudget={addBudget} />}
        <img src={image} className="image" />
      </div>
      <div className="budgets-container">
        {userBudgets.map((budget, index) => {
          if (jwt) {
            return (
              <BudgetCard
                jwt={jwt}
                key={index}
                id={budget.id}
                name={budget.name}
                total={budget.amount}
                button={true}
                progressBar={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Home;
