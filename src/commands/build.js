import * as fs from "fs";
import { buildData } from "../user-api.js";
import { createRequire } from "module";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const prompt = require("prompt-sync")({ sigint: true });

const filePointer = path.join(__dirname, "../../file-name.js");
const args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Please input a single .csv file");
} else {
  const csvFile = args[0];
  await fs.access(filePointer, async function (error) {
    if (error) {
      console.log(
        '"file-name.js" has not been created in the repository root directory.'
      );
    } else {
      const imported = await import(filePointer);
      const fileName = imported.fileName;
      fs.access(fileName, function (err) {
        if (err) {
          buildData(csvFile);
          console.log(`Created ${fileName} from ${csvFile}`);
        } else {
          let confirmation;
          let validInput = false;
          while (!validInput) {
            console.log("");
            confirmation = prompt(
              `${fileName} has already been created. Overwrite? (y/n) `
            );
            if (
              confirmation.toLowerCase() == "q" ||
              confirmation.toLowerCase() == "n"
            ) {
              console.log("Cancelling build...");
              validInput = true;
            } else if (confirmation.toLowerCase() == "y") {
              buildData(csvFile);
              console.log(
                `Overwrote and recreated ${fileName} from ${csvFile}`
              );
              validInput = true;
            } else {
              console.log(
                'Invalid input, please try again, or enter "q" to quit'
              );
            }
          }
        }
      });
    }
  });
}
