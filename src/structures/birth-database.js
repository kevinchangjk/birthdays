import { Birthday } from "./birthday.js";
import { AvlTree } from "./avl-tree.js";

export class BirthDatabase {
  constructor() {
    for (let i = 0; i < 366; i++) {
      this[i] = [];
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

  add(birthday) {
    const birth = new Birthday(birthday[0], birthday[1], birthday[2]);
    const date = birth.birthDate();
    const bucket = this[date];
    bucket.push(birth);
  }

  remove(name) {}

  listAll() {
    for (let i = 0; i < 366; i++) {
      this[i].forEach((birthday) => birthday.display());
    }
  }
}
