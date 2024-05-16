import { connection } from "./connection.js";
import { generateId } from "./ids.js";

const getPolicyTable = () => connection.table("policy");

export async function getPolicys() {
  return await getPolicyTable().select();
}

export async function getPolicy(id) {
  return await getPolicyTable().first().where({ id });
}
