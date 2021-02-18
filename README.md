
# Coin Flip Game

## Description
Flip a coin virtually as if flipping a real coin. And try to guess the result. Written on Node.js. The basic functionalities are described below.


```
coinflip <LOGFILE.TXT> [OPTION]

Displays the date

Commands:
  coinflip LOGFILE.TXT  (optional) Sets the logfile name as "LOGFILE.TXT. The
                        filename is a current date by default.

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --game, --Game  Start guessing
  --debug         Debug (input logging)

Examples:
  coinflip                    Flips the coin
  coinflip --game             Starts the guessing game
  coinflip myluck.txt         Flips the coin and puts logs into the "myluck.txt"
                              file
  coinflip myluck.txt --game  Starts the guessing game and puts logs into the
                              "myluck.txt" file
```

## Initialisation

> NOTE: Linking/unlinking may require *sudo* rights 

Before use:
```bash
npm i
npm link
```

After use:
```bash
npm unlink
```

## Usage

### Examples

```bash
$ coinflip
Coin tossed. Result: 🔢 Tails
```
```bash
$ coinflip --game
Hiya! So, here is the deal: You have to guess the side and I will tell you guessed right or wrong. What is your guess? (🦅 Heads) / 2 (🔢 Tails) / q (Quit the game))
$ 1
Oof! You got it wrong! It is 🔢 Tails
What is your next guess? (🦅 Heads) / 2 (🔢 Tails) / q (Quit the game))
$ 1
Precisely! It is 🦅 Heads
What is your next guess? (🦅 Heads) / 2 (🔢 Tails) / q (Quit the game))
$ q
Thank you! See you soon!
```

### Logs
Logs are stored in *logs* directory