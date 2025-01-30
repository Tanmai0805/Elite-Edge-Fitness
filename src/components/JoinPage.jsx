import "./JoinPage.css";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JoinPage = () => {
  const { plan } = useParams(); // Get the plan from the URL
  const navigate = useNavigate();

  // Plan details
  const planDetails = {
    quarterly: {
      title: "Quarterly Plan",
      price: 18000,
    },
    half_yearly: {
      title: "Half-Yearly Plan",
      price: 36000,
    },
    yearly: {
      title: "Yearly Plan",
      price: 75000,
    },
  };

  const selectedPlan = planDetails[plan] || { title: "Plan Not Found", price: 0 };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    hours: "",
    payment: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Valid age is required.";
    if (!formData.hours || isNaN(formData.hours) || formData.hours <= 0)
      newErrors.hours = "Valid number of hours is required.";
    if (!formData.payment) newErrors.payment = "Payment is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit form data to the backend API
      try {
        const response = await fetch("http://localhost:4000/api/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            age: parseInt(formData.age, 10),
            hoursInGym: parseInt(formData.hours, 10),
            plan: selectedPlan.title,
            paymentMethod: formData.payment,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Successfully joined the plan!");
          navigate("/"); // Navigate back to the home page
        } else {
          alert(data.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  return (
    <div className="join-page">
      <div className="container">
        <h1>Join {selectedPlan.title}</h1>
        <h3>Price: Rs {selectedPlan.price}</h3>

        {selectedPlan.title === "Plan Not Found" ? (
          <p>The selected plan is not valid. Please go back to the Pricing page.</p>
        ) : (
          <form onSubmit={handleSubmit} className="join-form">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              {errors.age && <p className="error">{errors.age}</p>}
            </div>

            {/* Gym Hours */}
            <div className="form-group">
              <label htmlFor="hours">Number of Hours in Gym:</label>
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                required
              />
              {errors.hours && <p className="error">{errors.hours}</p>}
            </div>

            {/* Payment */}
            <div className="form-group">
              <label htmlFor="payment">Payment Method:</label>
              <select
                id="payment"
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
              </select>
              {errors.payment && <p className="error">{errors.payment}</p>}
            </div>

            <button type="submit">Confirm & Join</button>
            <button type="button" onClick={() => navigate("/pricing")}>
              Back to Pricing
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JoinPage;
