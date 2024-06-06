import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layouts/Main/Main.jsx";
import Home from "./pages/Home/Home.jsx";
import Budget, { budgetLoader } from "./pages/Budget/Budget.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Error from "./pages/Error/Error.jsx";
import Confirmation from "./pages/Confirmation/Confirmation.jsx";
import MFA from "./pages/MFA/MFA.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: budgetLoader,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "login",
    index: true,
    element: <Login />,
  },
  {
    path: "mfa",
    index: true,
    element: <MFA />,
  },

  {
    path: "confirmation",
    index: true,
    element: <Confirmation />,
  },
  {
    path: "signup",
    index: true,
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
