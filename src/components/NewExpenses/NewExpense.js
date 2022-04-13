import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = ({onAddExpense}) => {
    const saveExpenseDataHandler = (data) =>{
        const newExpenseData = {
            ...data,
            id: Math.random().toString()
        };
        onAddExpense(newExpenseData);
    };
    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
        </div>
    );
}

export default NewExpense;