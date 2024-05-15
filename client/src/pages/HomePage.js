import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../lib/graphql/quiries";

function HomePage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  return (
    <div>
      <h1 className="title">Product Information</h1>
      {products && <ProductList products={products} />}
    </div>
  );
}

export default HomePage;
