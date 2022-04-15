import { useState } from "react";
import { Button } from "../UI/Button";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = ({ onAddExpense }) => {
  const [enableForm, setEnableForm] = useState(false);
  const saveExpenseDataHandler = (data) => {
    const newExpenseData = {
      ...data,
      id: Math.random().toString(),
    };
    onAddExpense(newExpenseData);
  };

  const newExpenseButtonHandler = () => setEnableForm(true);
  const onCancelButtonHandler = () => setEnableForm(false);

  return (
    <Button type="button" onClick={newExpenseButtonHandler}>
          Add New Expense
        </Button>
    // <div className="new-expense">
    //   {!enableForm && <div className="new-expense__actions center">
    //     <Button type="button" onClick={newExpenseButtonHandler}>
    //       Add New Expense
    //     </Button>
    //   </div>}
    //   {enableForm && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={onCancelButtonHandler} />}
    // </div>
  );
};

export default NewExpense;
