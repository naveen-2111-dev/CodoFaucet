import React from "react";
import "tailwindcss/tailwind.css";
import Navbar from "./components/navbar";
import Faucet from "./pages/Faucet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/**
 * App Component
 *
 * This component defines the main structure of the application. It uses React Router
 * to set up routing for the application and includes a navigation bar and pages.
 *
 * @component App.jsx
 * @returns {JSX.Element} The main application structure.
 *
 * @example
 * Render this app component through main.jsx
 * <App />
 */
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Faucet />} />
      </Routes>
    </Router>
  );
};

export default App;
