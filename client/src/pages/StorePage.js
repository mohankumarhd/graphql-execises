import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getStore } from "../lib/graphql/quiries";

function StorePage() {
  const { storeId } = useParams();

  const [store, setStore] = useState();

  useEffect(() => {
    getStore(storeId).then((result) => setStore(result));
  }, [storeId]);

  if (!store) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h1 className="title">{store.name}</h1>
      <div className="box">{store.description}</div>
    </div>
  );
}

export default StorePage;
