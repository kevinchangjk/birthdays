import { Birthday } from "./birthday.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export class BirthDatabase {
  constructor() {
    for (let i = 0; i < 366; i++) {
      this[i] = [];
    }
  }

  add(birthday) {
    const birth = new Birthday(birthday[0], birthday[1], birthday[2]);
    const date = birth.dateIndex();
    const bucket = this[date];

    if (bucket.length == 0) {
      bucket.push(birth);
    } else {
      let index = 0;
      while (bucket[index].isEarlierName(birth)) {
        index++;
      }
      if (birth.isEqual(bucket[index])) {
        bucket[index] = birth;
      } else {
        bucket.splice(index, 0, birth);
      }
    }
  }

  remove(name) {
    const prompt = require("prompt-sync")({ sigint: true });
    let count = 0;
    const trackers = [];
    let dispRes = "result";
    for (let i = 0; i < 366; i++) {
      const bucket = this[i];
      for (let j = 0; j < bucket.length; j++) {
        const birthday = bucket[j];
        if (birthday.name.includes(name)) {
          count++;
          const tracker = { date: i, index: j };
          trackers.push(tracker);
          console.log(`\nEntry no. ${count}`);
          birthday.display();
          console.log("----------------------------------------");
        }
      }
    }
    if (count != 1) {
      dispRes += "s";
    }
    console.log(`\n${count} ${dispRes} found`);
    let entry;
    let validInput = false;
    while (!validInput) {
      console.log("");
      entry = prompt("Remove which entry? Enter just the number here: ");
      if (entry.toLowerCase() == "q") {
        console.log("Cancelling removal");
        return null;
      } else if (
        Number.isInteger(parseInt(entry)) &&
        entry > 0 &&
        entry <= count
      ) {
        validInput = true;
      } else {
        console.log('Invalid input, please try again, or enter "q" to quit');
      }
    }

    const tracker = trackers[entry - 1];
    const toRemove = this[tracker.date][tracker.index];
    validInput = false;
    let confirmation;
    while (!validInput) {
      console.log("");
      confirmation = prompt(
        `Confirm removal of entry no. ${entry} for ${toRemove.name}? (y/n) `
      );
      if (
        confirmation.toLowerCase() == "n" ||
        confirmation.toLowerCase() == "q"
      ) {
        console.log("Cancelling removal");
        validInput = true;
      } else if (confirmation.toLowerCase() == "y") {
        this[tracker.date].splice(tracker.index, 1);
        console.log(`Removed entry no. ${entry} for ${toRemove.name}`);
        validInput = true;
      } else {
        console.log('Invalid input, please try again, or enter "q" to quit');
      }
    }
  }

  build(birthdays) {
    for (let i = 0; i < birthdays.length; i++) {
      this.add(birthdays[i]);
    }
  }

  rebuild(database) {
    for (let i = 0; i < 366; i++) {
      const day = database[i];
      const date = day.map(function (birthday) {
        return new Birthday(birthday.name, birthday.date, birthday.info);
      });
      this[i] = date;
    }
  }

  listAll() {
    for (let i = 0; i < 366; i++) {
      const date = this[i];
      if (date.length > 0) {
        console.log(`On ${date[0].niceDate()}`);
        date.forEach((birthday) => birthday.display());
        console.log(
          "--------------------------------------------------------------------------------\n"
        );
      }
    }
  }

  queryDate(date) {
    const temp = new Birthday("", date, "");
    const bucket = this[temp.dateIndex()];
    return bucket;
  }

  queryName(name) {
    let count = 0;
    let dispRes = "result";
    for (let i = 0; i < 366; i++) {
      const bucket = this[i];
      for (const birthday of bucket) {
        if (birthday.name.includes(name)) {
          birthday.display();
          count++;
        }
      }
    }
    if (count != 1) {
      dispRes += "s";
    }
    console.log(`${count} ${dispRes} found`);
  }
}
