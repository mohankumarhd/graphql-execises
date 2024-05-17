import { useEffect, useState } from "react";
import { getCustomers } from "../lib/graphql/quiries";
import { Link } from "react-router-dom";

function CustomerList() {
  getCustomers().then((result) => console.log(result));
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="title is-4">Customers</h1>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th> Name</th>
              <th> Email</th>
              <th> Phone</th>
              <th> Profile</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr>
                <td>{customer && customer.customerId}</td>
                <td>{customer && customer.name}</td>
                <td>{customer && customer.email}</td>
                <td>{customer && customer.phoneNumber}</td>
                <td>
                  {" "}
                  <Link to={`/customers/${customer.customerId}`}>Details </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomerList;
