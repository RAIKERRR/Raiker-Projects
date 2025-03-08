import React, { useState, useEffect } from "react";

function App() {
  const [weatherEntries, setWeatherEntries] = useState([]);
  const [newWeatherEntry, setNewWeatherEntry] = useState({
    location: "",
    temperature: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchWeatherEntries();
  }, []);

  async function fetchWeatherEntries() {
    try {
      const response = await fetch("http://localhost:5000/weather");
      const data = await response.json();
      setWeatherEntries(data);
    } catch (error) {
      console.error("Failed to fetch weather entries", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWeatherEntry),
      });
      if (response.ok) {
        fetchWeatherEntries();
        setNewWeatherEntry({
          location: "",
          temperature: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
      }
    } catch (error) {
      console.error("Failed to add weather entry", error);
    }
  }

  return (
    <div>
      <h1>🌦️ Weather Log</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={newWeatherEntry.location}
          onChange={(e) =>
            setNewWeatherEntry({ ...newWeatherEntry, location: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Temperature (°C)"
          value={newWeatherEntry.temperature}
          onChange={(e) =>
            setNewWeatherEntry({
              ...newWeatherEntry,
              temperature: e.target.value,
            })
          }
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newWeatherEntry.description}
          onChange={(e) =>
            setNewWeatherEntry({
              ...newWeatherEntry,
              description: e.target.value,
            })
          }
          required
        />
        <input
          type="date"
          value={newWeatherEntry.date}
          onChange={(e) =>
            setNewWeatherEntry({ ...newWeatherEntry, date: e.target.value })
          }
          required
        />
        <button type="submit">Log Weather</button>
      </form>

      <h2>Previous Entries</h2>
      <ul>
        {weatherEntries.map((entry, index) => (
          <li key={index}>
            {entry.date} - {entry.location}: {entry.temperature}°C,{" "}
            {entry.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
