import { enumerateData } from "../user-api.js";

const included = enumerateData();
for (const date of included) {
  console.log(`On ${date[0].niceDate()}`);
  date.forEach((birthday) => birthday.display());
  console.log(
    "--------------------------------------------------------------------------------\n"
  );
}
