import { createDatabase, readDatabase, rebuildDatabase } from "../src/api.js";
import { AvlTree } from "../src/structures/avl-tree.js";
import { BirthDatabase } from "../src/structures/birth-database.js";
import database from "./birthdays.json" assert { type: "json" };

async function test() {
  const filename = "../csv/birth.csv";
  createDatabase(filename);
}

async function rebuildTest() {
  const newDatabase = await rebuildDatabase(database);
  newDatabase.listAll();
}

// test();
// treeTest();
rebuildTest();
