import mongoose from "./index.js";

const expensesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: {type: String, default: "Expenses"},
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
  },
  {
    collection: "expenses",
    versionKey: false,
  }
);

const expensesModel = mongoose.model("expenses", expensesSchema);

export default expensesModel;
