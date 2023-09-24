import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: String,
  email: String,
  password: String,
  salt: String,
});

export const  customerModel = mongoose.model("customer", CustomerSchema);
