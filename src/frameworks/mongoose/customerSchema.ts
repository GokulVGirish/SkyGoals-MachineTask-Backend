import mongoose from "mongoose";
import ICustomer from "../../entities/customer";

const customerSchema=new mongoose.Schema<ICustomer>({
  s_no: String,
  name_of_customer: String,
  email: String,
  mobile_number: String,
  dob: Date,
  created_at: Date,
  modified_at: Date,
});

customerSchema.index({ email: 1, mobile_number: 1 });

const Customer=mongoose.model("customer",customerSchema)
export default Customer
