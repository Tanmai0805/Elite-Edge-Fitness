import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkoutSessions from "./components/WorkoutSessions";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import BMICalculator from "./components/BMICalculator";
import Footer from "./components/Footer";
import JoinPage from "./components/JoinPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route for Hero page with additional sections */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WorkoutSessions />
              <Gallery />
              <BMICalculator />
              <Footer />
            </>
          }
        />

        {/* Route for Contact page */}
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Route for Pricing page */}
        <Route
          path="/pricing"
          element={
            <>
              <Pricing />
              <Footer />
            </>
          }
        />

        {/* Route for JoinPage */}
        <Route
          path="/join/:plan"
          element={
            <>
              <JoinPage />
              <Footer />
            </>
          }
        />
      </Routes>
      <ToastContainer theme="dark" position="top-center" />
    </Router>
  );
};

export default App;
