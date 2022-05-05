import * as fs from "fs";
import { parse } from "csv-parse";
import { BirthDatabase } from "./structures/birth-database.js";

// counts the index for a leap year, so assumes 366 days total
function dateToIndex(date) {
  const month = parseInt(date.substring(2));
  const day = parseInt(date.substring(0, 2));

  function totalDays(month) {
    switch (month) {
      case 1:
        return 0;
      case 2:
        return 31 + totalDays(month - 1);
      case 3:
        return 29 + totalDays(month - 1);
      case 4:
        return 31 + totalDays(month - 1);
      case 5:
        return 30 + totalDays(month - 1);
      case 6:
        return 31 + totalDays(month - 1);
      case 7:
        return 30 + totalDays(month - 1);
      case 8:
        return 31 + totalDays(month - 1);
      case 9:
        return 31 + totalDays(month - 1);
      case 10:
        return 30 + totalDays(month - 1);
      case 11:
        return 31 + totalDays(month - 1);
      case 12:
        return 30 + totalDays(month - 1);
      default:
        return 0;
    }
  }

  return totalDays(month) + day - 1;
}

function properDate(date) {
  return date;
}

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

export function readDatabase() {
  const file = "../birthdays.json";
  const res = JSON.parse(fs.readFileSync(file));
  return res;
}

export async function rebuildDatabase(database) {
  const res = new BirthDatabase();
  res.rebuild(database);
  return res;
}
