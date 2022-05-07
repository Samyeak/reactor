import React from 'react'
import Login from './components/Login/Login';
import Button from './components/UI/Button';
import StyledButton from './components/UI/StyledButton';
import { User } from './components/Users/User';

const App = () => {
  return (
    <>
    <Login/>
    <StyledButton>Button from Styled </StyledButton>
    <Button>Button from Module</Button>
    <User/>
    </>
  )
}

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
