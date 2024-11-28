import appData from "../../entities/applicationConfig";
import mongoose from "mongoose"
import {faker} from "@faker-js/faker";
import Customer from "../mongoose/customerSchema";



async function generateFakeCustomers(batchSize: number, totalRecords: number) {
  let batch = [];
  for (let i = 1; i <= totalRecords; i++) {
    batch.push({
      s_no: faker.string.uuid(),
      name_of_customer: faker.name.fullName(),
      email: faker.internet.email(),
      mobile_number: faker.phone.number({style:"national"}),
      dob: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      created_at: new Date(),
      modified_at: new Date(),
    });

    if (batch.length === batchSize) {
      try {
        await Customer.insertMany(batch); 
        console.log(`Inserted ${i} records so far`);
      } catch (err) {
        console.error("Error inserting batch:", err);
      }
      batch = []; 
    }
  }


  if (batch.length > 0) {
    try {
      await Customer.insertMany(batch);
     
    } catch (e) {

        console.log(e)

    }
  }

  console.log("Finished inserting all records!");
}


async function main() {
  await mongoose.connect(
    appData.DATABASE_URL as string
  );
  console.log("Connected to MongoDB");

  const totalRecords = 2000000;
  const batchSize = 500;

  await generateFakeCustomers(batchSize, totalRecords);
  console.log("Data generation completed");
  await mongoose.disconnect();
}

main().catch((e) => console.error(e));
