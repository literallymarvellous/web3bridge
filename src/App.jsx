import { useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";

const tiers = {
  1: {
    tier: "1",
    amount: "10000",
    interest: "5",
  },
  2: {
    tier: "2",
    amount: "20000",
    interest: "10",
  },
  3: {
    tier: "3",
    amount: "30000",
    interest: "20",
  },
};

function App() {
  const [form, setForm] = useState({
    name: "",
    tier: "1",
    amount: "",
    date: Date(),
    withdrawDate: Date(),
  });
  const [savings, setSavings] = useState([]);
  const tierInfo = tiers[form.tier];
  const [error, setError] = useState("");
  const [totalSavings, setTotalSavings] = useState(0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.amount !== tierInfo.amount) {
      setError("enter right amount");
      return;
    }
    const date = dayjs().format("DD/MM/YYYY");
    const withdrawDate = dayjs().add(1, "week").format("DD/MM/YYYY");
    console.log(date, withdrawDate);

    setForm({
      ...form,
      date: Date().toDateString(),
      withdrawDate: Date().toDateString(),
    });

    setSavings((prev) => [...prev, form]);
    setForm({
      ...form,
      name: "",
      tier: "1",
      amount: "",
      date: Date(),
      withdrawDate: Date(),
    });
  };

  const handleClick = (id) => {
    console.log("hey");
    const newSavings = savings.filter((saving) => saving.name !== id);
    setSavings(newSavings);
  };

  const calcTotalSavings = () => {
    let total = 0;
    savings.forEach((saving) => (total += Number(saving.amount)));
    setTotalSavings(total);
  };

  useEffect(() => {
    calcTotalSavings();
  }, [savings, totalSavings]);

  return (
    <div className="App">
      <header className="App-header">Savings Group</header>

      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Enter</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="tier">Select savings tier</label>
            <select
              id="tier"
              name="tier"
              value={form.tier}
              onChange={handleChange}
            >
              <option value="1">tier 1</option>
              <option value="2">tier 2</option>
              <option value="3">tier 3</option>
            </select>
            <div className="tier-info">
              <span>Tier: {tierInfo.tier}</span>
              <span>Interest: {tierInfo.interest}%</span>
              <span>Expected savings amount: {tierInfo.amount}</span>
              <span>
                Total amount to recieve:{" "}
                {(Number(tierInfo.amount) * Number(tierInfo.interest)) / 100 +
                  Number(tierInfo.amount)}
              </span>
            </div>
          </div>

          <div>
            <label>Enter expected savings amount required for tier</label>
            <input
              type="text"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            ></input>
            {error && <p className="error">Entered wrong savings amount</p>}
          </div>

          <button>submit</button>
        </form>

        <div>
          <ul>
            {savings.map((saving) => (
              <li key={saving.name}>
                <div className="display-info">
                  <span>Name: {saving.name}</span>
                  <span>Tier: {saving.tier}</span>
                  <span>Saved: {saving.amount}</span>
                  <span>
                    Recieving:{" "}
                    {(Number(tiers[saving.tier].amount) *
                      Number(tiers[saving.tier].interest)) /
                      100 +
                      Number(tiers[saving.tier].amount)}
                  </span>
                  <span>Date Saved: {saving.date}</span>
                  <span>Withdrawal date: {saving.withdrawDate}</span>
                </div>
                <button onClick={() => handleClick(saving.name)}>
                  Withdraw
                </button>
              </li>
            ))}

            <div className="total">Total Savings: {totalSavings}</div>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
