"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    s_no: String,
    name_of_customer: String,
    email: String,
    mobile_number: String,
    dob: Date,
    created_at: Date,
    modified_at: Date,
});
customerSchema.index({ email: 1, mobile_number: 1 });
const Customer = mongoose_1.default.model("customer", customerSchema);
exports.default = Customer;
