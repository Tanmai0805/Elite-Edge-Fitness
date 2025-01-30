import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    hoursInGym: { type: Number, required: true },
    plan: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", PlanSchema);

export default Plan;
