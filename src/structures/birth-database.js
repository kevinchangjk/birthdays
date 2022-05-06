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

  remove(entry) {
    const bucket = this[entry.dateIndex()];
    let index;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].isEqual(entry)) {
        index = i;
        break;
      }
    }
    bucket.splice(index, 1);
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
    const included = [];
    for (let i = 0; i < 366; i++) {
      const bucket = this[i];
      for (const birthday of bucket) {
        if (birthday.name.includes(name)) {
          included.push(birthday);
        }
      }
    }
    return included;
  }
}
