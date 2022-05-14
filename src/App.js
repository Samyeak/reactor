import React, { useState } from "react";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import Button from "./components/UI/Button";
import StyledButton from "./components/UI/StyledButton";
import { User } from "./components/Users/User";
import AuthContext from "./store/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <MainHeader />
        <Login />
        <StyledButton>Button from Styled </StyledButton>
        <Button>Button from Module</Button>
        <User />
      </AuthContext.Provider>
    </>
  );
};

export default App;

// import { useState } from 'react';
// import Expenses from './components/Expenses/Expenses';
// import NewExpense from './components/NewExpenses/NewExpense';
// const defaultExpenses = [
//   {
//     id: 1,
//     title: "Toilet Paper",
//     amount: 94.12,
//     date: new Date(2020, 1, 13)
//   },
//   {
//     id: 2,
//     title: "Lunch",
//     amount: 1256.12,
//     date: new Date(2020, 1, 18)
//   },
//   {
//     id: 3,
//     title: "Pokhara Trip",
//     amount: 18000,
//     date: new Date(2020, 1, 22)
//   }
// ];

// function App() {
//   const [expenses, setExpenses] = useState(defaultExpenses);

//   const addExpenseHandler = expense => {
//     setExpenses(prev => {
//       return [expense, ...prev];
//     });
//     console.log("App.js New Expense Data", expense);
//   };
//   return (
//     <div>
//       <h2>Let's get started</h2>
//       <NewExpense onAddExpense={addExpenseHandler}/>
//       <Expenses items={expenses} />
//     </div>
//   );
// }

// export default App;
