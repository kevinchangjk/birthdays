import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "./data-api.js";

export async function enumerateData() {
  const database = await readDatabase();
  database.listAll();
}

export async function queryDate(date) {
  const database = await readDatabase();
  database.queryDate(date);
}

export async function queryName(name) {
  const database = await readDatabase();
  database.queryName(name);
}
