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
    .command('LOGFILE.TXT', '(optional) Sets the logfile name as "LOGFILE.TXT. The filename is a current date by default.')
    .alias('game', 'Game').describe('game', 'Start guessing')
    .describe('debug', 'Debug (input logging)')
    .example('coinflip', 'Flips the coin')
    .example('coinflip --game', 'Starts the guessing game')
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
const currentDate = new Date;
const EOL = '\n';
let logFilename = null;
let coinValue = null;
let locale = null;
if (arguments[0]) logFilename = "logs/" + arguments[0];
else logFilename = "logs/"
+ currentDate.toISOString().replaceAll(':','-') + ".txt";

// SET SYSTEM LOCALE IF AVAILABLE
if (process.env.LANG.includes("ru")) locale = russian;
else locale = english;

// GET RANDOM VALUE FROM AN ARRAY
const getRandomAnswer = function (array) {
    return array[Math.floor(Math.random() * Math.floor(array.length))];
};

// WRITE TO A FILE
const writeToFile = function(guess, value) {
    let playersGuess = "Player's guess: " + guess + "; ";
    let answer = "Answer: " + coinValue + "." + EOL;
    if (!guess) playersGuess = '';
    if (!value) answer = '';
    fs.appendFile(logFilename, playersGuess + answer,
    function (e) {
        if (e) fs.writeFile(logFilename, playersGuess + answer,
        function (e) {
            if (e) throw e;
        });
    });
}

// CHECK A COIN GUESS
const checkResult = function(value) {
    let guess = null;
    if (value==locale.key.heads) guess=locale.result.one;
    if (value==locale.key.tails) guess=locale.result.two;
    if (coinValue==guess) rl.write(getRandomAnswer(locale.answer.right)
    + coinValue + EOL);
    else rl.write(getRandomAnswer(locale.answer.wrong) + coinValue + EOL);
    writeToFile(guess, coinValue);
    initialisation(locale.next + EOL);
}

// COINFLIP
const flip_a_coin = function() {
    // return Math.floor(Math.random() * Math.floor(2));
    const value = Math.random();
    if (value < 0.499916666) return locale.result.one;
    else if (value < 0.999833333) return locale.result.two;
    else return locale.result.three;
};

// READLINE QUESTION FUNCTION IF PLAYER IS READY (GAME ARG)
const initialisation = function(line) {
    rl.question(line, (answer) => {
        switch(answer) {
            case locale.key.heads:
                coinValue = flip_a_coin();
                checkResult(answer);
                break;
            case locale.key.tails:
                coinValue = flip_a_coin();
                checkResult(answer);
                break;
            case locale.key.quit:
                rl.write(getRandomAnswer(locale.exit) + EOL);
                rl.close();
                break;
            default:
                initialisation(locale.introduction + EOL);
                break;
        };
    });
};

// FAST FLIP (NO ARGS)
const fast_flip = function() {
    coinValue = flip_a_coin();
    rl.write(locale.fast + coinValue + EOL);
    rl.close();
};

// GAME START
if (game) initialisation(locale.introduction + EOL);
else {
    fast_flip();
    writeToFile(false, coinValue);
}