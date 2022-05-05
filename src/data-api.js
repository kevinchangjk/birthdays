import * as fs from "fs";
import { parse } from "csv-parse";
import { BirthDatabase } from "./structures/birth-database.js";
import { fileName } from "../file-name.js";

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
  fs.writeFile(fileName, res, function (error, result) {
    if (error) {
      console.log(error.message);
    }
  });
}

export async function readDatabase() {
  const res = JSON.parse(fs.readFileSync(fileName));
  return await rebuildDatabase(res);
}

export async function rebuildDatabase(database) {
  const res = new BirthDatabase();
  res.rebuild(database);
  return res;
}
