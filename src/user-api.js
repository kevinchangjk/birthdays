import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "./data-api.js";

const database = await readDatabase();

export function enumerateData() {
  return database.listAll();
}

export function queryDate(date) {
  return database.queryDate(date);
}

export function queryName(name) {
  return database.queryName(name);
}

export async function addEntry(entry) {
  database.add(entry);
  await writeDatabase(database);
}

export async function removeEntry(entry) {
  database.remove(entry);
  await writeDatabase(database);
}
