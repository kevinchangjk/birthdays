import { queryName } from "../user-api.js";

const args = process.argv.slice(2);
for (const arg of args) {
  const results = await queryName(arg);
  const count = results.length;
  const dispRes = count == 1 ? "result" : "results";
  for (const result of results) {
    result.display();
  }
  console.log(`\n${count} ${dispRes} found`);
}
