import { Birthday } from "./birthday.js";
import { AvlTree } from "./avl-tree.js";

export class BirthDatabase {
  constructor() {
    for (let i = 0; i < 366; i++) {
      this[i] = new AvlTree();
    }
  }

  build(birthdays) {
    for (let i = 0; i < birthdays.length; i++) {
      this.add(birthdays[i]);
    }
  }

  add(birthday) {
    const birth = new Birthday(birthday[0], birthday[1], birthday[2]);
    const date = birth.birthDate();
    const bucket = this[date];
    bucket.add(birth);
  }

  remove(name) {}

  listAll() {
    for (let i = 0; i < 366; i++) {
      this[i].list();
    }
  }
}
