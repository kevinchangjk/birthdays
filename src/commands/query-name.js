import { queryName } from "../user-api.js";

const args = process.argv.slice(2);
args.forEach(function (arg) {
  queryName(arg);
});
