import { queryDate } from "../user-api.js";
import { Birthday } from "../structures/birthday.js";

// formats a pure number to a string representating dates
function formatDate(num) {
  const actual = num + 1;
  if (actual < 10) {
    return "0" + actual.toString();
  } else {
    return actual.toString();
  }
}

// gets today's date
function getDate() {
  const today = new Date();
  const day = formatDate(today.getDay());
  const month = formatDate(today.getMonth());
  return day + month;
}

// the querying process for a date
const args = process.argv.slice(2);

// if no argument given, then it queries using today's date, and celebrates
if (args.length == 0) {
  const date = getDate();
  const bucket = queryDate(date);
  if (bucket.length > 0) {
    console.log(`\n🎉🎉🎉 Today, on ${bucket[0].niceDate()} 🎉🎉🎉\n`);
    bucket.forEach((birthday) => birthday.celebrate());
  }
} else {
  // with arguments given, it queries for all dates passed through
  for (const arg of args) {
    const bucket = await queryDate(arg);
    console.log("\n----------------------------------------");
    if (bucket.length === 0) {
      const temp = new Birthday("", arg, "");
      console.log(`No birthdays found on ${temp.niceDate()}`);
    } else {
      console.log(`On ${bucket[0].niceDate()}: `);
      bucket.forEach((birthday) => birthday.display());
    }
  }
}
