import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { useEffect, useState } from "react";
import { getProduct } from "../lib/graphql/quiries";

function ProductPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  getProduct(productId).then((product) => console.log(product));

  useEffect(() => {
    getProduct(productId).then((product) => setProduct(product));
  }, [productId]);

  if (!product) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h1 className="title is-2">{product.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/stores/${product.store.id}`}>{product.store.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(product.date, "long")}
        </div>
        <p className="block">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
