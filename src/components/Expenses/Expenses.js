import { useState } from "react";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItem";

const Expenses = ({ items }) => {
  const [filterYear, setFilterYear] = useState("2022");
  const expenseFilterHandler = (newFilterYear) => {
    setFilterYear(newFilterYear);
  };

  const filteredExpenses = items.filter(x=>x.date.getFullYear() === Number(filterYear));
  let expensesContent = <p>No expenses found.</p>;
  if(filteredExpenses.length > 0){
    expensesContent = filteredExpenses.map((item) => (
        <ExpenseItem {...item} key={item.id} />
      ));
  }
  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter selectedYear={filterYear} onExpenseFilter={expenseFilterHandler} />
        { expensesContent }
      </Card>
    </div>
  );
};

export default Expenses;
