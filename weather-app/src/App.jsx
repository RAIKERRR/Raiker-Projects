import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const response = await fetch("http://localhost:5000/weather", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newWeatherEntry),
});
