"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicationConfig_1 = __importDefault(require("../../entities/applicationConfig"));
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const customerSchema_1 = __importDefault(require("../mongoose/customerSchema"));
async function generateFakeCustomers(batchSize, totalRecords) {
    let batch = [];
    for (let i = 1; i <= totalRecords; i++) {
        batch.push({
            s_no: faker_1.faker.string.uuid(),
            name_of_customer: faker_1.faker.name.fullName(),
            email: faker_1.faker.internet.email(),
            mobile_number: faker_1.faker.phone.number({ style: "national" }),
            dob: faker_1.faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
            created_at: new Date(),
            modified_at: new Date(),
        });
        if (batch.length === batchSize) {
            try {
                await customerSchema_1.default.insertMany(batch);
                console.log(`Inserted ${i} records so far`);
            }
            catch (err) {
                console.error("Error inserting batch:", err);
            }
            batch = [];
        }
    }
    if (batch.length > 0) {
        try {
            await customerSchema_1.default.insertMany(batch);
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log("Finished inserting all records!");
}
async function main() {
    await mongoose_1.default.connect(applicationConfig_1.default.DATABASE_URL);
    console.log("Connected to MongoDB");
    const totalRecords = 2000000;
    const batchSize = 500;
    await generateFakeCustomers(batchSize, totalRecords);
    console.log("Data generation completed");
    await mongoose_1.default.disconnect();
}
main().catch((e) => console.error(e));
