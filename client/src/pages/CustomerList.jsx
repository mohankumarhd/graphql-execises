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
        <ul className="box">
          {customers.map((customer) => (
            <li className="media">
              <div className="media-content">
                <Link to={`/customers/${customer.customerId}`}>
                  {customer.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CustomerList;
