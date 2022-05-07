import { Birthday } from "./birthday.js";

/**
 * Stores the entries of Birthdays.
 */
export class BirthDatabase {
  // initializes an array of length 366, one for each day
  constructor() {
    for (let i = 0; i < 366; i++) {
      this[i] = [];
    }
  }

  // adds an entry to the appropriate index, but also ensures that it is sorted
  // if there is already an entry with the same name, then it is overwritten
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

  // removes a specified entry by checking in the same index for the same name
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

  // records down all entries passed through as an array of arrays of information
  build(birthdays) {
    for (let i = 0; i < birthdays.length; i++) {
      this.add(birthdays[i]);
    }
  }

  // rebuilds database from parsing the JSON object
  rebuild(database) {
    for (let i = 0; i < 366; i++) {
      const day = database[i];
      const date = day.map(function (birthday) {
        return new Birthday(birthday.name, birthday.date, birthday.info);
      });
      this[i] = date;
    }
  }

  // enumerates all entries
  listAll() {
    const included = [];
    for (let i = 0; i < 366; i++) {
      const date = this[i];
      if (date.length > 0) {
        included.push(this[i]);
      }
    }
    return included;
  }

  // returns the index indicated by the date
  queryDate(date) {
    const temp = new Birthday("", date, "");
    const bucket = this[temp.dateIndex()];
    return bucket;
  }

  // returns all entries that the search string is included in the name of the entry
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
