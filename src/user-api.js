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
  database.queryDate(date);
}

export async function checkToday() {
  const date = getDate();
  database.checkToday(date);
}

export async function queryName(name) {
  database.queryName(name);
}
