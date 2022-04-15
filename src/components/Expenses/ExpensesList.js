import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = ({ list }) => {
  if (list.length === 0) {
    return <h2 className="expenses-list__fallback">No expenses found.</h2>;
  }

  return (
    <ul className="expenses-list">
      {list.map((item) => (
        <li key={item.id}><ExpenseItem {...item} /></li>
      ))}
    </ul>
  );
};

export default ExpensesList;
