import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "../src/data-api.js";

import { enumerateData, queryDate, queryName } from "../src/user-api.js";
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
  const name = "Chang";
  // queryName(name);
}

async function enumTest() {
  enumerateData();
}

// test();
// treeTest();
// rebuildTest();
// readTest();
// addTest();
queryTest();
// enumTest();
