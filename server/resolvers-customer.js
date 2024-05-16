import { getCustomer, getCustomers } from "./db/customers.js";

export const resolversCustomer = {
  Query: {
    customers: () => getCustomers(),
    customer: (__root, { id }) => getCustomer(id),
  },
};
