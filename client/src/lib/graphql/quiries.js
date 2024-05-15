import { GraphQLClient, gql } from "graphql-request";
import { getAccessToken } from "../auth";

const client = new GraphQLClient("http://localhost:9000/graphql", {
  headers: () => {
    const accessToken = getAccessToken();
    console.log("[AccessToken]", accessToken);
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` };
    }

    return {};
  },
});

export async function createProduct(title, description) {
  const mutation = gql`
    mutation CreateProduct($input: CreateProductInput!) {
      job: createProduct(input: $input) {
        id
      }
    }
  `;
  const { job } = await client.request(mutation, {
    input: {
      title,
      description,
    },
  });

  return job;
}

export async function getStore(id) {
  const query = gql`
    query Store($id: ID!) {
      store(id: $id) {
        description
        id
        name
      }
    }
  `;
  const { store } = await client.request(query, { id });
  return store;
}

export async function getProduct(id) {
  const query = gql`
    query Product($id: ID!) {
      product(id: $id) {
        date
        description
        id
        title
        store {
          id
          description
          name
        }
      }
    }
  `;
  const { product } = await client.request(query, { id });
  return product;
}

export async function getProducts() {
  const query = gql`
    query {
      products {
        id
        title
        date
        store {
          id
          name
        }
      }
    }
  `;

  const { products } = await client.request(query);

  return products;
}
