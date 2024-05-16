import { getCustomers } from "./db/customers.js";

export const resolversCustomer = {
  Query: {
    customers: () => getCustomers(),
  },
};
