import { connection } from "./connection.js";
import { generateId } from "./ids.js";

const getCustomerTable = () => connection.table("customer");

export async function getCustomers() {
  return await getCustomerTable().select();
}

export async function getCustomer(customerId) {
  return await getCustomerTable().first().where({ customerId });
}
