import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";

function ProductList({ products }) {
  return (
    <ul className="box">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

function ProductItem({ product }) {
  const title = product.store
    ? `${product.title} at ${product.store.name}`
    : product.title;
  return (
    <li className="media">
      <div className="media-left has-text-grey">{formatDate(product.date)}</div>
      <div className="media-content">
        <Link to={`/products/${product.id}`}>{title}</Link>
      </div>
    </li>
  );
}

export default ProductList;
