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
  const month = parseInt(date.substring(2));
  const day = parseInt(date.substring(0, 2));
  let dispMonth;
  let dispDay;
  switch (month) {
    case 1:
      dispMonth = "January";
      break;
    case 2:
      dispMonth = "February";
      break;
    case 3:
      dispMonth = "March";
      break;
    case 4:
      dispMonth = "April";
      break;
    case 5:
      dispMonth = "May";
      break;
    case 6:
      dispMonth = "June";
      break;
    case 7:
      dispMonth = "July";
      break;
    case 8:
      dispMonth = "August";
      break;
    case 9:
      dispMonth = "September";
      break;
    case 10:
      dispMonth = "October";
      break;
    case 11:
      dispMonth = "November";
      break;
    case 12:
      dispMonth = "December";
      break;
    default:
      dispMonth = "";
      break;
  }

  switch (day) {
    case 1:
    case 21:
      dispDay = `${day}st`;
      break;
    case 2:
    case 22:
      dispDay = `${day}nd`;
      break;
    case 3:
    case 23:
      dispDay = `${day}rd`;
      break;
    default:
      dispDay = `${day}th`;
      break;
  }

  return `${dispDay} ${dispMonth}`;
}

function randomEmoji() {
  const choices = [
    "🔥",
    "💀",
    "👻",
    "💩",
    "🤡",
    "😈",
    "👽",
    "🤖",
    "💃",
    "🐒",
    "🐍",
    "🌈",
    "🌚",
    "🚓",
    "🚑",
    "🚀",
    "🔞",
  ];
  return choices[Math.floor(Math.random() * choices.length)];
}

export class Birthday {
  constructor(name, date, info) {
    this.name = name;
    this.date = date;
    this.info = info;
  }

  dateIndex() {
    return dateToIndex(this.date);
  }

  niceDate() {
    return properDate(this.date);
  }

  isEarlierName(other) {
    return this.name < other.name;
  }

  isEqual(other) {
    return this.name == other.name;
  }

  display() {
    console.log(`\nName: ${this.name}`);
    console.log(`Birthday: ${properDate(this.date)}`);
    console.log(`Notes: ${this.info}`);
  }

  celebrate() {
    const emoji = randomEmoji();
    console.log(`${this.name} has levelled up!`);
    console.log(`In case you forgot: ${this.info} ${emoji}\n`);
  }
}
