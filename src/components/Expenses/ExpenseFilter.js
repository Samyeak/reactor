import Card from "../UI/Card";
import "./ExpenseFilter.css";

const ExpenseFilter = ({onExpenseFilter, selectedYear}) =>{
    const filterYearChangeHandler = (event) => {
        onExpenseFilter(event.target.value);
    }
    return (
        <Card className='expenses-filter'>
        <div className='expenses-filter__control'>
          <label>Filter by year</label>
          <select value={selectedYear} onChange={filterYearChangeHandler}>
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
            <option value='2019'>2019</option>
          </select>
        </div>
      </Card>
    );
};

export default ExpenseFilter;