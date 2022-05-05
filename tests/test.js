import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "../src/api.js";
// import database from "./birthdays.json" assert { type: "json" };

async function test() {
  const filename = "../csv/birth.csv";
  createDatabase(filename);
}

async function rebuildTest() {
  const newDatabase = await rebuildDatabase(database);
  newDatabase.listAll();
}

async function readTest() {
  const data = readDatabase();
  const newData = await rebuildDatabase(data);
  newData.listAll();
}

async function addTest() {
  const entry = ["Some guy", "1205", "Not important"];
  const data = readDatabase();
  const newData = await rebuildDatabase(data);
  newData.add(entry);
  writeDatabase(newData);
}

// test();
// treeTest();
// rebuildTest();
readTest();
// addTest();
