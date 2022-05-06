import { queryDate } from "../user-api.js";

function formatDate(num) {
  const actual = num + 1;
  if (actual < 10) {
    return "0" + actual.toString();
  } else {
    return actual.toString();
  }
}

function getDate() {
  const today = new Date();
  const day = formatDate(today.getDay());
  const month = formatDate(today.getMonth());
  return day + month;
}

const args = process.argv.slice(2);
if (args.length == 0) {
  const date = getDate();
  const bucket = queryDate("1205");
  if (bucket.length > 0) {
    console.log(`\n🎉🎉🎉 Today, on ${bucket[0].niceDate()} 🎉🎉🎉\n`);
    bucket.forEach((birthday) => birthday.celebrate());
  }
} else {
  args.forEach(function (arg) {
    const bucket = queryDate(arg);
    if (bucket.length === 0) {
      console.log(`No birthdays found on ${temp.niceDate()}`);
    } else {
      console.log(`On ${bucket[0].niceDate()}: `);
      bucket.forEach((birthday) => birthday.display());
    }
  });
}
