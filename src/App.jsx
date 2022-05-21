import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    tier: "",
  });
  const [savings, setSavings] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavings((prev) => [...prev, form]);
    setForm({
      ...form,
      name: "",
      tier: "",
    });
  };

  return (
    <div className="App">
      <header className="App-header">Savings Group</header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <select name="tier" value={form.tier} onChange={handleChange}>
            <option value="1">tier 1</option>
            <option value="2">tier 2</option>
            <option value="3">tier 3</option>
          </select>

          <button>submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;
