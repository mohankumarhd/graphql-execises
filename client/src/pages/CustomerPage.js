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
      <h4 className="title is-4 align-center">Customer Details</h4>
      <div class="columns is-mobile is-multiline ">
        <div class="column is-narrow">
          <p class="bd-notification is-primary">
            <br />
            <p>{customer.customerId && "Id : " + customer.customerId}</p>
            <p>{customer.name && "Name : " + customer.name}</p>
            <p></p>
            {customer.email && "Email : " + customer.email}
            <p>
              {customer.phoneNumber && "Phone Number : " + customer.phoneNumber}
            </p>
          </p>
        </div>
        <div class="column is-narrow">
          <p class="bd-notification is-primary">
            <br />

            <p>{customer.policy && "Policy Id : " + customer.policy.id}</p>
            <p>{customer.policy && "Name : " + customer.policy.name}</p>
            <p>
              {customer.policy && "Start Date : " + customer.policy.startDate}
            </p>
            <p>{customer.policy && "End Date : " + customer.policy.endDate}</p>
            <p>
              {customer.policy &&
                "Renewal Date : " + customer.policy.renewalDate}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
