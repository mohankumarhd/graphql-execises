import { getCustomer, getCustomers } from "./db/customers.js";
import { getPolicy } from "./db/policy.js";

export const resolversCustomer = {
  Query: {
    customers: () => getCustomers(),
    customer: (__root, { id }) => getCustomer(id),
  },

  Customer: {
    policy: (customer) => getPolicy(customer.policyId),
  },
};
