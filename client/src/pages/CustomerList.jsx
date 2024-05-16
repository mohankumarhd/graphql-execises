import { getCustomers } from "../lib/graphql/quiries";

function CustomerList() {
  getCustomers().then((result) => console.log(result));
  return (
    <>
      <h2>Customers List</h2>
    </>
  );
}

export default CustomerList;
