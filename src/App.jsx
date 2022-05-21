import { useState } from "react";
import "./App.css";

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
  });
  const [savings, setSavings] = useState([]);
  const tierInfo = tiers[form.tier];
  const [error, setError] = useState("");

  const handleChange = (e) => {
    // if (e.target.name === "amount" && e.target.value !== tierInfo.amount) {
    //   setError("enter right amount");
    // }
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
    setSavings((prev) => [...prev, form]);
    setForm({
      ...form,
      name: "",
      tier: "1",
      amount: "",
    });
  };

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
            <div>
              tier: {tierInfo.tier}, interest: {tierInfo.interest}%, expected
              savings amount: {tierInfo.amount}
              total amount to recieve:{" "}
              {(Number(tierInfo.amount) * Number(tierInfo.interest)) / 100 +
                Number(tierInfo.amount)}
            </div>
          </div>

          <div>
            <label>Enter amount required for tier</label>
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
      </main>
    </div>
  );
}

export default App;
