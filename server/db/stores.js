import { connection } from "./connection.js";

const getStoreTable = () => connection.table("store");

export async function getStore(id) {
  return await getStoreTable().first().where({ id });
}
