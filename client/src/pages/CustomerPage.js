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
      <div className="columns">
        <div className="column">
          <div>Id:{customer && customer.customerId}</div>
          <div>Name:{customer && customer.name}</div>
          <div>Email:{customer && customer.email}</div>
          <div>Phone Number:{customer && customer.phoneNumber}</div>

          <div>Policy Id:{customer && customer.policy.id}</div>
          <div>Name:{customer && customer.policy.name}</div>
          <div>Start Date:{customer && customer.policy.startDate}</div>
          <div>End Date:{customer && customer.policy.endDate}</div>
          <div>Renewal Date:{customer && customer.policy.renewalDate}</div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
