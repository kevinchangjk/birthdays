import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "./data-api.js";

// builds the database from a .csv file
export async function buildData(file) {
  await createDatabase(file);
}

// enumerates all entries in the database
export async function enumerateData() {
  const database = await readDatabase();
  return database.listAll();
}

// queries for a date
export async function queryDate(date) {
  const database = await readDatabase();
  return database.queryDate(date);
}

// queries for a name, or a string
export async function queryName(name) {
  const database = await readDatabase();
  return database.queryName(name);
}

// adds an entry to the database
export async function addEntry(entry) {
  const database = await readDatabase();
  database.add(entry);
  await writeDatabase(database);
}

// removes an entry from the database
export async function removeEntry(entry) {
  const database = await readDatabase();
  database.remove(entry);
  await writeDatabase(database);
}
