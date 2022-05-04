import * as fs from "fs";
import { parse } from "csv-parse";
import { BirthDatabase } from "./structures/birth-database.js";

// reads a .csv file to generate a database of birthdays
export function createDatabase(file) {
  const birthdays = [];
  const database = new BirthDatabase();

  fs.createReadStream(file)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      birthdays.push(row);
    })
    .on("end", function () {
      database.build(birthdays);
      const res = JSON.stringify(database);
      fs.writeFile("birthdays.json", res, function (error, result) {
        if (error) {
          console.log(error.message);
        }
      });
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

export async function readDatabase() {
  const file = "./birthdays.json";
  const database = async () => {
    try {
      const data = await fetch(file);
      const response = await data.json();
    } catch (error) {
      console.log(error);
    }
  };
  return await database(file);
}
