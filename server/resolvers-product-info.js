import { createProduct, getProduct, getProducts } from "./db/products.js";
import { getStore } from "./db/stores.js";
import { GraphQLError } from "graphql";

export const resolversProductInfo = {
  Query: {
    products: async () => await getProducts(),
    product: (_root, { id }) => getProduct(id),
    store: (_root, { id }) => getStore(id),
  },

  Product: {
    store: (product) => getStore(product.storeId),
    date: (product) => product.createdAt.slice(0, "yyyy-mm-dd".length),
  },

  Mutation: {
    createProduct: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        unauthorizedError("Unauthorised access");
      }

      console.log(user);
      const storeId = user.storeId;

      return createProduct({ storeId, title, description });
    },
  },
};

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED" },
  });
}
