# ENG-SDECodeExercise-010222-1653
This repository contains the files for the required SDE excercise

[![Badge](https://img.shields.io/badge/Enthusiasm-over_9000-dargreen)](https://circleci.com/gh/contentful/the-example-app.nodejs)

## Requirements

* Node 12+
* Git

## Setup
Clone the repo and install the dependencies.
```bash
git clone https://github.com/Steven0110/ENG-SDECodeExercise-010222-1653.git
cd ENG-SDECodeExercise-010222-1653
```


```bash
npm install
```

## Usage
Step 1. Execute this command.

```bash
node index.js
```

Step 1.1. Optionally you can add the --verbose flag to see details about how it is executed:

```bash
node index.js --verbose
```

Step 2. You will be asked to enter the name of the first file containing the street addresses of the shipment destinations. Once typed, type *Enter*.

Step 3. You will be asked to enter the name of the second file containing the names of the drivers. Once typed, type *Enter*.

Result. The script will output the total base suitability score (SS) and a matching between shipment destinations and drivers.

## Example
Having the files `addresses.txt` and `drivers.txt` in the `files` folder, follow the next steps:
```bash
node index.js
Enter the name of the file containing the addresses > addresses.txt
Enter the name of the file containing the drivers > drivers.txt

> The total base suitability score (SS) is: 67.5
```

## Text files structure
Each text file should contain the information splitted in multiple lines, each name (street's or driver's) should be in a single line. This is an example of the content of both files:

Addresses file:
```bash
McKenzie Avenue
Main Street
Oak Park
Elm Street
Lake North Avenue
Maple St.
Washington Ninth
```

Drivers file:
```bash
Liam Nelson
Charles Noah
James Sunderland
Frankie Rivers
Toby Stank
Stephen Normal
Evan Peterson
Amanda Wallet

```


