# Birthdays

Ever thought that remembering each and every one of your family/friends/acquaintances birthdays is too difficult?

With this, you can make it slightly less tedious by letting your _terminal_ remind you when it's someone's birthday.

## Installation

Clone this repository in whatever directory you like, though I would recommend cloning it where your terminal configs are too.

To ensure full functionality, make sure that you have the following node modules as well:

- `fs`: part of Node.js core
- `module`: local to npm
- `csv-parse`: used for reading from the `.csv` files

## Usage

Create a `.csv` file containing all birthdays you want to store, together with the name of the person, and additional notes if necessary.

Query the data through:

1. Search by name: Input a name, and get the stored data and additional info
2. Search by date: Input a date, and get the stored name and additional info

Additionally, terminal will run the script to check if today's date is anyone's birthday, and print the result onto the terminal as a reminder.

## TODO

1. Add the sorting functionality to the database
2. Create the querying function
3. Create bash script for terminal
4. Add your own birthdays to it
