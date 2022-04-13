import Expenses from './components/Expenses/Expenses';

function App() {
  const expenses = [
    {
      id: 1,
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 1, 13)
    },
    {
      id: 2,
      title: "Lunch",
      amount: 1256.12,
      date: new Date(2020, 1, 18)
    },
    {
      id: 3,
      title: "Pokhara Trip",
      amount: 18000,
      date: new Date(2020, 1, 22)
    }
  ]
  return (
    <div>
      <h2>Let's get started</h2>
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
