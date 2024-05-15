import { getAccessToken } from "../auth";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
  concat,
  ApolloLink,
} from "@apollo/client";

const httpLink = createHttpLink({ uri: "http://localhost:9000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export async function createProduct(title, description) {
  const mutation = gql`
    mutation CreateProduct($input: CreateProductInput!) {
      job: createProduct(input: $input) {
        id
      }
    }
  `;

  const result = await apolloClient.mutate({
    mutation,
    variables: {
      input: { title, description },
    },
  });

  return result.data.job;
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

  const result = await apolloClient.query({
    query,
    variables: { id },
  });
  return result.data.store;
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

  const result = await apolloClient.query({
    query,
    variables: { id },
  });
  return result.data.product;
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

  const result = await apolloClient.query({ query });

  return result.data.products;
}
