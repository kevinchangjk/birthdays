import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
  queryDate,
} from "../src/data-api.js";
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
  data.listAll();
}

async function addTest() {
  const entry = ["Orange Guy", "1205", "Not important"];
  const data = readDatabase();
  data.add(entry);
  writeDatabase(newData);
}

async function queryTest() {
  const date = "1205";
  queryDate(date);
}

// test();
// treeTest();
// rebuildTest();
// readTest();
// addTest();
queryTest();
