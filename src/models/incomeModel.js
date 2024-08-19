import mongoose from "./index.js";

const IncomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, default: "Income" },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
  },
  {
    versionKey: false,
  }
);

const incomeModel = mongoose.model("income", IncomeSchema);

export default incomeModel;
