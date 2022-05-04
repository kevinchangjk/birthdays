import { createDatabase, readDatabase } from "../src/functions.js";
import { AvlTree } from "../src/structures/avl-tree.js";
import { BirthDatabase } from "../src/structures/birth-database.js";
import database from "./birthdays.json" assert { type: "json" };

async function test() {
  const filename = "../csv/birth.csv";
  createDatabase(filename);
  const database = await readDatabase();
  database.listAll();
}

function treeTest() {
  const tree = new AvlTree();
  const data = [
    ["Kevin", "1205", "Self"],
    ["Wilson", "1610", "Big"],
    ["Brayden", "0810", "Small"],
  ];
  const base = new BirthDatabase();
  base.build(data);
  base.listAll();
}

// test();
// treeTest();
console.log(database);
database.listAll();
