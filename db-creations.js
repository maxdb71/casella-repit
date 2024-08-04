const mongoose = require("mongoose");
const { Schema } = mongoose;

// Account schema
const accountSchema = new Schema({
  accountID: { type: String, required: true },
  secret: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

const Account = mongoose.model("Account", accountSchema);

// Box schema
const boxSchema = new Schema({
  boxID: { type: String, required: true },
  type: { type: String, required: true },
  userID: { type: String, required: true },
  desc: { type: String },
  discountType: { type: String },
  status: { type: String },
  creationDate: { type: Date, default: Date.now },
});

const Box = mongoose.model("Box", boxSchema);

// Product schema
const productSchema = new Schema({
  boxID: { type: String, required: true },
  productID: { type: String, required: true },
  qty: { type: Number, required: true },
  next_issue: { type: Date },
  notes: { type: String },
  questions: { type: Array },
  status: { type: String },
  from_number: { type: String },
  creationDate: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

// Item schema
const itemSchema = new Schema({
  boxID: { type: String, required: true },
  productID: { type: String, required: true },
  stored: { type: Boolean, required: true },
  from_date: { type: Date },
  status: { type: String },
  creationDate: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = { Account, Box, Product, Item };
