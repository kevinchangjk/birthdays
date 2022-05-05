import { Birthday } from "./birthday.js";

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

  remove(name) {}

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
        console.log(
          "--------------------------------------------------------------------------------\n"
        );
        console.log(`On ${date[0].niceDate()}: \n`);
        date.forEach((birthday) => birthday.display());
      }
    }
  }

  queryDate(date) {
    const temp = new Birthday("", date, "");
    const bucket = this[temp.dateIndex()];
    if (bucket.length == 0) {
      console.log(`No birthdays found on ${temp.niceDate()}`);
    } else {
      console.log(`On ${bucket[0].niceDate()}: \n`);
      bucket.forEach((birthday) => birthday.display());
    }
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
