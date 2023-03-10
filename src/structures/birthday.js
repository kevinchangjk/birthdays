// counts the index for a leap year, so assumes 366 days total
function dateToIndex(date) {
  const month = parseInt(date.substring(2));
  const day = parseInt(date.substring(0, 2));

  // recursive function that returns the total days
  function totalDays(month) {
    switch (month) {
      case 1:
        return 0;
      case 3:
        return 29 + totalDays(month - 1);
      case 5:
      case 7:
      case 10:
      case 12:
        return 30 + totalDays(month - 1);
      case 2:
      case 4:
      case 6:
      case 8:
      case 9:
      case 11:
        return 31 + totalDays(month - 1);
      default:
        return 0;
    }
  }

  return totalDays(month) + day - 1;
}

// given a date in DDMM format, returns a string of the date in a nice format
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

// literally picks one of the below emojis randomly
function randomEmoji() {
  const emojis = process.env.BIRTHDAY_EMOJIS;
  const choices = [];
  for (const emoji of emojis) {
    choices.push(emoji);
  }
  return choices[Math.floor(Math.random() * choices.length)];
}

/**
 * Represents an entry for a person's birthday.
 * Stores the name, the date, and additional information.
 */
export class Birthday {
  // initializes the name, date, and additional info
  constructor(name, date, info) {
    this.name = name;
    this.date = date;
    this.info = info;
  }

  // returns the appropriate index
  dateIndex() {
    return dateToIndex(this.date);
  }

  // returns the nicely formatted date
  niceDate() {
    return properDate(this.date);
  }

  // checks if this name comes earlier than another entry
  isEarlierName(other) {
    return this.name < other.name;
  }

  // checks if this name is equal to another entry
  isEqual(other) {
    return this.name == other.name;
  }

  // prints out to console the encapsulated information
  display() {
    console.log(`\nName: ${this.name}`);
    console.log(`Birthday: ${properDate(this.date)}`);
    console.log(`Notes: ${this.info}`);
  }

  // prints out in a more fun way, meant for when it's actually the birthday
  celebrate() {
    const emoji = randomEmoji();
    console.log(`  ${this.name} has levelled up!`);
    console.log(
      `  In case you forgot: ${
        this.info == "" ? "Never mind, nothing important" : this.info
      } ${emoji}\n`
    );
  }
}
