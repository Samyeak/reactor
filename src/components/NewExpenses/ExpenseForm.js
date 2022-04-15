import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({onSaveExpenseData, onCancel}) => {
    const defaultFormState = {
        title: "Default Title",
        amount: 0,
        date: ""
    };
    const [userInput, setUserInput] = useState(defaultFormState);

    const changeHandler = (event) =>{
        setUserInput(previousState => {
            return {...previousState, [event.target.name]:  event.target.value};
        });
    };

    const submitHandler = (event) =>{
        event.preventDefault();
         const expenseData = {
            title: userInput.title,
            amount: +userInput.amount,
            date: new Date(userInput.date)
         };
         onSaveExpenseData(expenseData);
         resetForm();
    }

    const clearHandler = () => {
        resetForm();
        onCancel();
    };

    const resetForm = () => {
        setUserInput(defaultFormState);
    }
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
            <label>Title</label>
            <input type="text" name="title" value={userInput.title} onChange={changeHandler} />
        </div>
        <div className="new-expense__control">
            <label>Amount</label>
            <input type="number" name="amount" min="0.01" step="0.01" value={userInput.amount} onChange={changeHandler} />
        </div>
        <div className="new-expense__control">
            <label>Date</label>
            <input type="date" name="date" min="2021-01-01" step="2022-12-01" value={userInput.date} onChange={changeHandler} />
        </div>
      </div>
      <div className="new-expense__actions">
          <button type="button" onClick={clearHandler}>Cancel</button>
          <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;