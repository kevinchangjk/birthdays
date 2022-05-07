import { queryName } from "../user-api.js";

const args = process.argv.slice(2);

// if there are argument(s) given, then query
if (args.length > 0) {
  for (const arg of args) {
    const results = await queryName(arg);
    const count = results.length;
    const dispRes = count == 1 ? "result" : "results";
    console.log("\n----------------------------------------");
    for (const result of results) {
      result.display();
    }
    console.log(`\n${count} ${dispRes} found for "${arg}"`);
  }
} else {
  // no argument, thus invalid
  console.log("Invalid input, enter at least one name to search");
}
