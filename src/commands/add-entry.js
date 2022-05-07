import { addEntry } from "../user-api.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prompt = require("prompt-sync")({ sigint: true });

const args = process.argv.slice(2);
let name;
let date;
let info;
let validEntry = false;

// loop for inputting entry
while (!validEntry) {
  console.log(
    "\n----------------------------------------\nInput the details below"
  );
  let validName = false;
  // if input name is invalid, which is empty
  while (!validName) {
    console.log("");
    name = prompt("Name: ");
    if (name.length > 0) {
      validName = true;
    } else {
      console.log("Enter a name");
    }
  }
  let validDate = false;
  // if input date is invalid, not in DDMM format
  while (!validDate) {
    console.log("");
    date = prompt("Birthday (in DDMM format): ");
    if (date.length === 4) {
      const day = parseInt(date.substring(0, 2));
      const month = parseInt(date.substring(2));
      if (
        Number.isInteger(day) &&
        Number.isInteger(month) &&
        day > 0 &&
        day <= 31 &&
        month > 0 &&
        month <= 12
      ) {
        if (month === 2) {
          if (day <= 29) {
            validDate = true;
          }
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
          if (day <= 30) {
            validDate = true;
          }
        } else {
          validDate = true;
        }
      }
    }
    if (!validDate) {
      console.log("Enter using proper DDMM format, eg. 1205 for 12th May");
    }
  }
  console.log("");
  info = prompt("Notes: ");
  let validConfirm = false;
  // if confirmation is invalid
  while (!validConfirm) {
    console.log("");
    const confirmation = prompt("Confirm entry? (y/n/q) ");
    if (confirmation.toLowerCase() == "q") {
      console.log("Cancelling entry...");
      validConfirm = true;
      validEntry = true;
    } else if (confirmation.toLowerCase() == "n") {
      console.log("Please input the details again");
      validConfirm = true;
    } else if (confirmation.toLowerCase() == "y") {
      const entry = [name, date, info];
      await addEntry(entry);
      console.log(`Added entry for ${name}`);
      validConfirm = true;
      validEntry = true;
    } else {
      console.log('Invalid input, please try again, or enter "q" to quit');
    }
  }
}
