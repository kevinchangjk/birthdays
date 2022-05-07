# Birthdays

Ever thought that remembering each and every one of your family/friends/acquaintances birthdays is too difficult?

With this, you can make it slightly less tedious by letting your _terminal_ remind you when it's someone's birthday.

## Installation

Clone this repository in whatever directory you like, though I would recommend cloning it where your terminal configs are too.

For full functionality, this package uses the following modules:

- `fs`: part of Node.js core
- `module`: local to npm
- `csv-parse`: used for reading from the `.csv` files
- `prompt-sync`: used for reading inputs from user

You can simply run the following command (if you have npm) to ensure that you have them for this function:

```bash
npm install
```

If you do not have npm (or are unsure), then do check out [this guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Setup

1. Install the package by cloning the repository, and run `npm install`.
2. `cd` into the package directory, and run the following command in your shell:
   ```bash
   source setup
   ```
   This allows you to use the `birthdays` function for step 3 and 4.
3. Create a `.csv` file containing all birthdays you want to store, together with the name of the person, and additional notes if necessary, and store it inside the package directory.
4. Run the following command to initialise the data. Suppose your `.csv` file is saved as `birthdays.csv`, then you should run:

   ```bash
   birthdays build ./birthdays.csv
   ```

   Or replace `./birthdays.csv` with whatever is the relative path to the file.

5. Find the absolute path to the package directory, using the command `pwd` in your shell. Copy it, then add these lines to your `.bashrc`, or whichever shell config file you are using. The absolute path will be saved as the variable `$BIRTHDAYS_DIR`.

   ```bash
   # if my url is ~/.bash/birthdays
   BIRTHDAYS_DIR="~/.bash/birthdays";
   cd $BIRTHDAYS_DIR;
   source setup;
   cd -;
   birthdays date;
   ```

   This will check the current date with the birthday entries, and display any entries that have their birthday today.

That's it! Good luck and have fun!

## Usage

The package supports a few operations to interact with the database.

- **Build**: This is what you have to use during the setup, to initialise the data by inputting the `.csv` file to use.
  ```bash
  birthdays build ./example.csv
  ```
- **Search by Name**: Input one or more names (or just strings actually), and get entries that match the names. This operation is case-insensitive.
  ```bash
  birthdays name "Kevin" "chang" "kevinchangjk"
  ```
- **Search by Date**: Input one or more dates (in DDMM format), and get entries that match the dates.
  ```bash
  birthdays date 0101 0908 2512
  ```
- **List**: Prints out all entries that you have saved.
  ```bash
  birthdays list
  ```
- **Add entry**: Prompts you for details like the name, the birthday, additional notes, and saves the entry.
  ```bash
  birthdays add
  ```
- **Remove entry**: Input a name or string to search, and prompts you to pick and remove from the entries that match your search.
  ```bash
  birthdays remove "Kevin"
  ```
- **Celebrate**: Checks with today's date and celebrates for whoever has their birthday today.
  - Typically this wouldn't be called by the user explicitly, but it can be done by running:
    ```bash
    birthdays date
    ```

### Customisability

There ain't a lot of options to customize to be honest. But since you got the entire repo cloned, if you really wanted to you could just rewrite everything.

- **File Name**:
  By default, the file name for the JSON file that will act as the database is `birthdays.json`. This file will be generated and kept in the main package directory.
  You can change this behaviour, along with the file name itself, by going into `setup` in the main directory, and looking at line 11 (and 14 for the URL). You can then change the variables accordingly.

- **Emojis**:
  When the terminal celebrates, it randomly generates an emoji from a list. This list can also be found in `setup`, at line 18. You can edit this list to your own liking, or even edit the celebrate function in `birthday.js` if you like.

## Future Developments

This was a very fast and simple project. I really wasn't aiming for a lot of extensive functionality when I made this.

Looking at how I might use this, I can see myself potentially working towards two other directions in the future for this package:

1. An active reminder system, in which you can highlight entries of higher priority, and state how many days in advance you want to be reminded about it.

   - The system will then, on that many days beforehand, and every day afterwards, remind you in the terminal.

2. Expanding to more events than birthdays. So then it would be able to store items such as holidays, anniversaries (for people who are always getting scolded for forgetting their anniversaries).

## TODO

1. Add your own birthdays to it
