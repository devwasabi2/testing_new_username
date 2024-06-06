const url = "http://localhost:5000";

export const getAllBudgets = async (token) => {
  const response = await fetch(`${url}/api/usersbudgets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

export const getAllExpenses = async (token, budgetid) => {
  const response = await fetch(`${url}/api/getitems?budgetid=${budgetid}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

export const createBudget = async (token, name, amount) => {
  const response = await fetch(`${url}/api/budget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, amount }),
  });
  const data = await response.json();
  return data;
};

export const getAllCategories = async (token) => {
  const response = await fetch(`${url}/api/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

export const createExpenseItem = async (
  token,
  budgetId,
  categoryId,
  name,
  price
) => {
  const response = await fetch(`${url}/api/expenseitem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      budgetId,
      categoryId,
      name,
      price,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteExpenseItem = async (token, id) => {
  const response = await fetch(`${url}/api/deleteitem?id=${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

export const createUser = async (token) => {
  const response = await fetch(`${url}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
