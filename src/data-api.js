import * as fs from "fs";
import { parse } from "csv-parse";
import { BirthDatabase } from "./structures/birth-database.js";

// reads a .csv file to generate a database of birthdays
export async function createDatabase(file) {
  const birthdays = [];
  const database = new BirthDatabase();

  fs.createReadStream(file)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      birthdays.push(row);
    })
    .on("end", function () {
      database.build(birthdays);
      writeDatabase(database);
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

export async function writeDatabase(database) {
  const res = JSON.stringify(database);
  fs.writeFile("../birthdays.json", res, function (error, result) {
    if (error) {
      console.log(error.message);
    }
  });
}

export async function readDatabase() {
  const file = "../birthdays.json";
  const res = JSON.parse(fs.readFileSync(file));
  return await rebuildDatabase(res);
}

export async function rebuildDatabase(database) {
  const res = new BirthDatabase();
  res.rebuild(database);
  return res;
}

export async function queryDate(date) {
  const database = await readDatabase();
  database.queryDate(date);
}
