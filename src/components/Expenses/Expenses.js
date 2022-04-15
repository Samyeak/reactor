import { useState } from "react";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import ExpensesChart from "./ExpensesChart";
import ExpensesList from "./ExpensesList";

const Expenses = ({ items }) => {
  const [filterYear, setFilterYear] = useState("2022");
  const expenseFilterHandler = (newFilterYear) => {
    setFilterYear(newFilterYear);
  };

  const filteredExpenses = items.filter(x=>x.date.getFullYear() === Number(filterYear));
  
  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter selectedYear={filterYear} onExpenseFilter={expenseFilterHandler} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList list={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
