import * as fs from "fs";
import { buildData } from "../user-api.js";
import { createRequire } from "module";
import { fileName, fileURL } from "../data-api.js";

const require = createRequire(import.meta.url);
const prompt = require("prompt-sync")({ sigint: true });

const args = process.argv.slice(2);

// can only build from one .csv file
if (args.length != 1) {
  console.log("Please input a single .csv file");
} else {
  const csvFile = args[0];
  fs.access(fileURL, async function (err) {
    if (err) {
      // file doesn't exist, create immediately
      await buildData(csvFile);
      console.log(`Created ${fileName} from ${csvFile}`);
    } else {
      // file already exists, check if user wishes to overwrite
      let confirmation;
      let validInput = false;
      while (!validInput) {
        console.log("");
        confirmation = prompt(
          `${fileName} has already been created. Overwrite? (y/n/q) `
        );
        if (
          confirmation.toLowerCase() == "q" ||
          confirmation.toLowerCase() == "n"
        ) {
          console.log("Cancelling build...");
          validInput = true;
        } else if (confirmation.toLowerCase() == "y") {
          await buildData(csvFile);
          console.log(`Overwrote and recreated ${fileName} from ${csvFile}`);
          validInput = true;
        } else {
          console.log('Invalid input, please try again, or enter "q" to quit');
        }
      }
    }
  });
}
