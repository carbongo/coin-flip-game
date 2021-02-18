#!/usr/bin/env node
const yargs = require('yargs/yargs');
const readline = require('readline');
const english = require('./locale/en.json');
const russian = require('./locale/ru.json');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

// YARGS
const argv = yargs(hideBin(process.argv))
    .usage('coinflip <LOGFILE.TXT> [OPTION]')
    .usage('')
    .usage('Displays the date')
    .command('LOGFILE.TXT', 'Sets the logfile name as "LOGFILE.TXT"')
    .alias('game', 'Game').describe('game', 'Start guessing')
    .describe('debug', 'Debug (input logging)')
    .example('coinflip', 'Flips the coin')
    .example('coinflip -game', 'Starts the guessing game')
    .example('coinflip myluck.txt', 'Flips the coin and puts logs into the "myluck.txt" file')
    .example('coinflip myluck.txt --game', 'Starts the guessing game and puts logs into the "myluck.txt" file')
    .argv;

// INPUT DESTRUCTION
const { _: arguments, game, debug } = argv;

// FOR INPUT TEST PURPOSES
if (debug) console.log('DEBUG: ', arguments, ' GAME: ', game);

// DEFINE READLINE INTERFACE
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// GLOBAL VARIABLES
const EOL = '\n';
let targetNumber = null;
let locale = null;

// SET SYSTEM LOCALE IF AVAILABLE
if (process.env.LANG.includes("ru")) locale = russian;
else locale = english;

// GET RANDOM VALUE FROM AN ARRAY
const getRandomAnswer = function (array) {
    return array[Math.floor(Math.random() * Math.floor(array.length))];
};

// READLINE QUESTION FUNCTION WITH COIN GUESS
const number_question = function() {
    rl.question("", (answer) => {
        if (answer==targetNumber) initialisation(getRandomAnswer(locale.answer.right) + EOL);
        else initialisation(getRandomAnswer(locale.answer.right) + EOL);
    });
};

// COINFLIP
const flip_a_coin = function() {
    // return Math.floor(Math.random() * Math.floor(2));
    const value = Math.random();
    if (value < 0.499916666) return locale.result.one;
    else if (value < 0.999833333) return locale.result.two;
    else return locale.result.three;
};

// READLINE QUESTION FUNCTION IF PLAYER IS READY
const initialisation = function(line) {
    rl.question(line, (answer) => {
        switch(answer) {
            case locale.key.yes:
                flip_a_coin();
                rl.write(locale.ready + EOL);
                number_question();
                break;
            case locale.key.no:
                rl.write(getRandomAnswer(locale.exit) + EOL);
                rl.close();
                break;
            default:
                initialisation(locale.introduction + EOL);
                break;
        };
    });
};

const fast_flip = function() {
    rl.write(locale.fast + flip_a_coin() + EOL);
    rl.close();
};

// GAME START
if (game) initialisation(locale.introduction + EOL);
else fast_flip()

// try {
//     fs.unlinkSync('/logs/');
//     console.log('successfully deleted /tmp/hello');
//   } catch (err) {
//     // handle the error
//   }