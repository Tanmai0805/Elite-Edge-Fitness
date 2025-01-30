import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Hero = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleStartJourney = () => {
    navigate("/contact"); // Navigate to the contact page
  };

  const handleDiscoverPlan = () => {
    navigate("/pricing"); // Navigate to the pricing page
  };

  return (
    <section className="hero">
      <div className="content">
        <div className="title">
          <h1>LET'S</h1>
          <h1>GET</h1>
          <h1>MOVING</h1>
        </div>
        <div className="sub-title">
          <p>Your Journey to Fitness Here</p>
          <p>Unleash Your Potentials</p>
        </div>
        <div className="buttons">
          <button onClick={handleStartJourney}>Start Your Journey</button>
          <button onClick={handleDiscoverPlan}>Discover Your Plan</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
