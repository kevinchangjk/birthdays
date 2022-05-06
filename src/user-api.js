import {
  createDatabase,
  readDatabase,
  rebuildDatabase,
  writeDatabase,
} from "./data-api.js";

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

const database = await readDatabase();

export async function enumerateData() {
  database.listAll();
}

export async function queryDate(date) {
  const bucket = database.queryDate(date);
  if (bucket.length == 0) {
    console.log(`No birthdays found on ${temp.niceDate()}`);
  } else {
    console.log(`On ${bucket[0].niceDate()}: `);
    bucket.forEach((birthday) => birthday.display());
  }
}

export async function checkToday() {
  const date = getDate();
  const bucket = database.queryDate(date);
  if (bucket.length > 0) {
    console.log(`\n🎉🎉🎉 Today, on ${bucket[0].niceDate()} 🎉🎉🎉\n`);
    bucket.forEach((birthday) => birthday.celebrate());
  }
}

export async function queryName(name) {
  database.queryName(name);
}

export async function addEntry(entry) {
  database.add(entry);
  await writeDatabase(database);
}

export async function removeEntry(name) {
  database.remove(name);
  await writeDatabase(database);
}
