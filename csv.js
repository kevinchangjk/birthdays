import * as fs from "fs";
import { parse } from "csv-parse";
import { Birthday } from "./objects.js";

async function createDatabase(file) {
  const res = [];

  fs.createReadStream(file)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      const birthday = new Birthday(row[0], row[1], row[2]);
      res.push(birthday);
    });

  return res;
}

const file = "birth.csv";
const res = await createDatabase(file);
setTimeout(() => console.log(res), 100);
