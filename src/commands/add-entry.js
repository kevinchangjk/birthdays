import { addEntry } from "../user-api.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prompt = require("prompt-sync")({ sigint: true });

const args = process.argv.slice(2);
let name;
let date;
let info;
let validEntry = false;
while (!validEntry) {
  console.log("");
  name = prompt("Name: ");
  // add data validation loop for birthday
  date = prompt("Birthday (in DDMM format): ");
  info = prompt("Additional Information: ");
  let validConfirm = false;
  while (!validConfirm) {
    console.log("");
    const confirmation = prompt("Confirm entry? (y/n) ");
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
