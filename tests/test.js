import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  readd,
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
  const data = readd();
  const newData = await rebuildDatabase(data);
  newData.listAll();
}

// test();
// treeTest();
// rebuildTest();
readTest();
