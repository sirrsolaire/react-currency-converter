import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("TRY");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        if (amount <= 0) return;
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setConverted(data.rates[toCurr]);
        setIsLoading(false);
      }

      if (fromCurr === toCurr) return setConverted(amount);
      convert();
    },
    [amount, fromCurr, toCurr]
  );

  return (
    <div className="container">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter value"
        disabled={isLoading}
        style={{ marginRight: 10 }}
      />
      <select
        value={fromCurr}
        onChange={(e) => setFromCurr(e.target.value)}
        disabled={isLoading}
        style={{ marginRight: 10 }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="TRY">TL</option>
      </select>
      <span>to</span>
      <select
        value={toCurr}
        onChange={(e) => setToCurr(e.target.value)}
        disabled={isLoading}
        style={{ marginLeft: 10 }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="TRY">TL</option>
      </select>

      <p>
        {converted}
        <span style={{ marginLeft: 8 }}>{toCurr}</span>
      </p>
    </div>
  );
}
