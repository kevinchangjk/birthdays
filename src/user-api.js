import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "./data-api.js";

const database = await readDatabase();

export function enumerateData() {
  database.listAll();
}

export function queryDate(date) {
  return database.queryDate(date);
}

export function queryName(name) {
  database.queryName(name);
}

export async function addEntry(entry) {
  database.add(entry);
  await writeDatabase(database);
}

export async function removeEntry(name) {
  database.remove(name);
  await writeDatabase(database);
}
