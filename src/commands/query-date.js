import { queryDate } from "../user-api.js";
import { Birthday } from "../structures/birthday.js";

// formats a pure number to a string representating dates
function formatDate(num) {
  if (num < 10) {
    return "0" + num.toString();
  } else {
    return num.toString();
  }
}

// gets today's date
function getTodaysDate() {
  const today = new Date();
  const day = formatDate(today.getDate());
  const month = formatDate(today.getMonth() + 1);
  return day + month;
}

// the querying process for a date
const args = process.argv.slice(2);

// if no argument given, then it queries using today's date, and celebrates
if (args.length == 0) {
  const date = getTodaysDate();
  const bucket = await queryDate(date);
  if (bucket.length > 0) {
    console.log("----------------------------------------");
    console.log(`\n🎉🎉🎉 Today, on ${bucket[0].niceDate()} 🎉🎉🎉\n`);
    bucket.forEach((birthday) => birthday.celebrate());
  }
} else {
  // with arguments given, it queries for all dates passed through
  for (const date of args) {
    let validDate = false;
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
    if (validDate) {
      const bucket = await queryDate(date);
      console.log("\n----------------------------------------");
      if (bucket.length === 0) {
        const temp = new Birthday("", date, "");
        console.log(`No birthdays found on ${temp.niceDate()}`);
      } else {
        console.log(`On ${bucket[0].niceDate()}: `);
        bucket.forEach((birthday) => birthday.display());
      }
    } else {
      console.log("\n----------------------------------------");
      console.log(`${date} is not a valid date in DDMM format`);
    }
  }
}
