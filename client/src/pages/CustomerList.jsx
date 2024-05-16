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
      <div>
        <h1 className="title">Customers</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th> Name</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr>
                <td>{customer && customer.customerId}</td>
                <td>
                  <Link to={`/customers/${customer.customerId}`}>
                    {customer && customer.name}
                  </Link>
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
