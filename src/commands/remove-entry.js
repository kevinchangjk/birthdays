import { queryName, removeEntry } from "../user-api.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prompt = require("prompt-sync")({ sigint: true });

const args = process.argv.slice(2);
if (args.length != 1) {
  console.log("Please input a single name in quotes");
} else {
  let removing = true;
  const results = await queryName(args[0]);
  let count = results.length;
  let dispRes = count == 1 ? "result" : "results";
  for (let i = 0; i < count; i++) {
    console.log(`\nEntry no. ${i + 1}`);
    results[i].display();
    console.log("----------------------------------------");
  }
  console.log(`\n${count} ${dispRes} found`);
  if (count == 0) {
    removing = false;
  }
  let entry;
  let validInput = false;
  while (removing && !validInput) {
    console.log("");
    entry = prompt("Remove which entry? Enter just the number here: ");
    if (entry.toLowerCase() == "q") {
      console.log("Cancelling removal...");
      validInput = true;
      removing = false;
    } else if (
      Number.isInteger(parseInt(entry)) &&
      entry > 0 &&
      entry <= count
    ) {
      validInput = true;
    } else {
      console.log('Invalid input, please try again, or enter "q" to quit');
    }
  }

  if (removing) {
    const toRemove = results[entry - 1];
    validInput = false;
    let confirmation;
    while (!validInput) {
      console.log("");
      confirmation = prompt(
        `Confirm removal of entry no. ${entry} for ${toRemove.name}? (y/n) `
      );
      if (
        confirmation.toLowerCase() == "n" ||
        confirmation.toLowerCase() == "q"
      ) {
        console.log("Cancelling removal...");
        validInput = true;
      } else if (confirmation.toLowerCase() == "y") {
        await removeEntry(toRemove);
        console.log(`Removed entry no. ${entry} for ${toRemove.name}`);
        validInput = true;
      } else {
        console.log('Invalid input, please try again, or enter "q" to quit');
      }
    }
  }
}
