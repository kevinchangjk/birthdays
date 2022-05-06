import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "./data-api.js";

export async function buildData(file) {
  await createDatabase(file);
}

export async function enumerateData() {
  const database = await readDatabase();
  return database.listAll();
}

export async function queryDate(date) {
  const database = await readDatabase();
  return database.queryDate(date);
}

export async function queryName(name) {
  const database = await readDatabase();
  return database.queryName(name);
}

export async function addEntry(entry) {
  const database = await readDatabase();
  database.add(entry);
  await writeDatabase(database);
}

export async function removeEntry(entry) {
  const database = await readDatabase();
  database.remove(entry);
  await writeDatabase(database);
}
