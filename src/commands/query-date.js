import { queryDate, checkToday } from "../user-api.js";

const args = process.argv.slice(2);
if (args.length == 0) {
  checkToday();
} else {
  args.forEach(function (arg) {
    queryDate(arg);
  });
}
