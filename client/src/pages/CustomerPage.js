import { useParams } from "react-router";
import { getCustomer } from "../lib/graphql/quiries";
import { useEffect, useState } from "react";
function CustomerPage() {
  const { customerId } = useParams(null);
  getCustomer(customerId).then((res) => console.log(res));
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getCustomer(customerId).then((customer) => setCustomer(customer));
  }, [customerId]);

  if (!customer) {
    <div>Loading....</div>;
  }
  return (
    <div>
      <h1 className="title is-2">Customer Details</h1>
      <div className="box">
        <div className="block">
          Customer Id:{customer && customer.customerId}
        </div>
        <div className="block">Customer Name:{customer && customer.name}</div>
        <div className="block">Email:{customer && customer.email}</div>
        <div className="block">
          Phone Number:{customer && customer.phoneNumber}
        </div>
        <div className="block">Policy Id{customer && customer.policyId}</div>
      </div>
    </div>
  );
}

export default CustomerPage;
