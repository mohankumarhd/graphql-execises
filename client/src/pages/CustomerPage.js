import { useParams } from "react-router";
import { getCustomer } from "../lib/graphql/quiries";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

  const backLinkStyle = {
    fontSize: "1.5rem",
    textDecoration: "none",
    transition: "color 0.3s ease",
    color: "black",
    cursor: "pointer",
    opacity: "1",
  };

  const backLinkHoverStyle = {
    opacity: "0.5",
  };
  return (
    <div className="container">
      <div className="level">
        <div className="level-left">
          <Link
            to="/customers"
            className="black-link"
            style={backLinkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.opacity = backLinkHoverStyle.opacity)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.opacity = backLinkStyle.opacity)
            }
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="title is-4 ml-5">Customer Details</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column is-two-thirds">
          <div className="box">
            <div className="content">
              <p>
                {customer && customer.customerId && <strong>Id:</strong>}{" "}
                {customer && customer.customerId}
              </p>
              <p>
                {customer && customer.name && <strong>Name:</strong>}{" "}
                {customer && customer.name}
              </p>
              <p>
                {customer && customer.email && <strong>Email:</strong>}{" "}
                {customer && customer.email}
              </p>
              <p>
                {customer && customer.phoneNumber && (
                  <strong>Phone Number:</strong>
                )}{" "}
                {customer && customer.phoneNumber}
              </p>
              <p>
                {customer && customer.policy && customer.policy.id && (
                  <strong>Policy Id:</strong>
                )}{" "}
                {customer &&
                  customer.policy &&
                  customer.policy.id &&
                  customer.policy.id}
              </p>
              <p>
                {customer && customer.policy && customer.policy.name && (
                  <strong>Policy Name:</strong>
                )}{" "}
                {customer &&
                  customer.policy &&
                  customer.policy.name &&
                  customer.policy.name}
              </p>
              <p>
                {customer && customer.policy && customer.policy.startDate && (
                  <strong>Start Date:</strong>
                )}{" "}
                {customer &&
                  customer.policy &&
                  customer.policy.startDate &&
                  customer.policy.startDate}
              </p>
              <p>
                {customer && customer.policy && customer.policy.endDate && (
                  <strong>End Date:</strong>
                )}{" "}
                {customer &&
                  customer.policy &&
                  customer.policy.endDate &&
                  customer.policy.endDate}
              </p>
              <p>
                {customer && customer.policy && customer.policy.renewalDate && (
                  <strong>Renewal Date:</strong>
                )}{" "}
                {customer &&
                  customer.policy &&
                  customer.policy.renewalDate &&
                  customer.policy.renewalDate}
              </p>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="box has-text-centered">
            <figure className="image is-128x128 is-inline-block">
              <img
                className="is-rounded"
                src="https://source.unsplash.com/random/200x200?sig=1"
                alt="Customer Avatar"
              />
            </figure>
            <h2 className="title is-4">{customer && customer.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
