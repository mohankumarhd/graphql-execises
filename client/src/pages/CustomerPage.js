import { useParams } from "react-router";
import { getCustomer } from "../lib/graphql/quiries";
import { useEffect, useState } from "react";
function CustomerPage() {
  const { customerId } = useParams(null);
  getCustomer(customerId).then((res) => console.log(res));
  const [state, setState] = useState({
    customer: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const customer = await getCustomer(customerId);
        setState({ customer, loading: false, error: false });
      } catch (error) {
        setState({ customer: null, loading: false, error: false });
      }
    })();
  }, [customerId]);

  const { customer, loading, error } = state;

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error....</div>;
  }
  return (
    <div>
      <h1 className="title is-2">Customer Details</h1>
      <div className="columns">
        <div className="column">
          <div>{customer.customerId && "Id : " + customer.customerId}</div>
          <div>{customer.name && "Name : " + customer.name}</div>
          <div>{customer.email && "Email : " + customer.email}</div>
          <div>
            {customer.phoneNumber && "Phone Number : " + customer.phoneNumber}
          </div>

          <div>{customer.policy.id && "Policy Id : " + customer.policy.id}</div>
          <div>{customer.policy.name && "Name : " + customer.policy.name}</div>
          <div>
            {customer.policy.startDate &&
              "Start Date : " + customer.policy.startDate}
          </div>
          <div>
            {customer.policy.endDate && "End Date : " + customer.policy.endDate}
          </div>
          <div>
            {customer.policy.renewalDate &&
              "Renewal Date : " + customer.policy.renewalDate}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
