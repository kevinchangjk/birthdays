import * as fs from "fs";
import { parse } from "csv-parse";
import { BirthDatabase } from "./structures/birth-database.js";
import * as path from "path";
import { fileURLToPath } from "url";

export const fileName = process.env.BIRTHDAYS_FILE;
const fileURL = process.env.BIRTHDAYS_URL;

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
  fs.writeFile(fileURL, res, function (error, result) {
    if (error) {
      console.log(error.message);
    }
  });
}

export async function readDatabase() {
  const res = JSON.parse(fs.readFileSync(fileURL));
  return await rebuildDatabase(res);
}

export async function rebuildDatabase(database) {
  var res = new BirthDatabase();
  res.rebuild(database);
  return res;
}
