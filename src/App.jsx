import React from "react";
import "tailwindcss/tailwind.css";
import Navbar from "./components/navbar";
import Faucet from "./pages/Faucet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";

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
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
