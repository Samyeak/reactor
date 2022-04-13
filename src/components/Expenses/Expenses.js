import ExpenseItem from './ExpenseItem';

const Expenses = ({items}) =>{
    return items.map(item => <ExpenseItem {...item} key={item.id} />);
};

export default Expenses;