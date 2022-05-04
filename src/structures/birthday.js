// counts the index for a leap year, so assumes 366 days total
function dateToIndex(date) {
  const month = parseInt(date.substring(2));
  const day = parseInt(date.substring(0, 2));

  function totalDays(month) {
    switch (month) {
      case 1:
        return 0;
      case 2:
        return 31 + totalDays(month - 1);
      case 3:
        return 29 + totalDays(month - 1);
      case 4:
        return 31 + totalDays(month - 1);
      case 5:
        return 30 + totalDays(month - 1);
      case 6:
        return 31 + totalDays(month - 1);
      case 7:
        return 30 + totalDays(month - 1);
      case 8:
        return 31 + totalDays(month - 1);
      case 9:
        return 31 + totalDays(month - 1);
      case 10:
        return 30 + totalDays(month - 1);
      case 11:
        return 31 + totalDays(month - 1);
      case 12:
        return 30 + totalDays(month - 1);
      default:
        return 0;
    }
  }

  return totalDays(month) + day - 1;
}

function properDate(date) {
  return date;
}

export class Birthday {
  constructor(name, date, info) {
    this.name = name;
    this.date = date;
    this.info = info;
  }

  birthDate() {
    return dateToIndex(this.date);
  }

  isEarlierName(other) {
    otherName = other.name;
    return this.name < other.name;
  }

  display() {
    console.log("Name: " + this.name);
    console.log("Birth date: " + properDate(this.date));
    console.log("Additional Information: " + this.info);
  }
}
