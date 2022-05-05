# Wordle Clone
#### Video Demo:  https://youtu.be/d0W3XCJhL1o

# Description:

For my CS50x 2022 final project, I decided to make a clone of the popular 'Wordle' game.
It's a game that everyone (myself included!) seems to be playing right now.

# Official Wordle Website:
Visit the official Wordle website [here](https://www.nytimes.com/games/wordle/index.html)

# How to Play
From [Wikipedia](https://en.wikipedia.org/wiki/Wordle):

Wordle is a web-based word game created and developed by Welsh software engineer Josh Wardle, and owned and published by The New York Times Company since 2022.
Players have six attempts to guess a five-letter word with feedback given for each guess in the form of colored tiles indicating when letters match or occupy the correct position.
After every guess, each letter is marked as either green, yellow or gray: green indicates that letter is correct and in the correct position, yellow means it is in the answer but not in the right position, while gray indicates it is not in the answer at all. Multiple instances of the same letter in a guess, such as the "o"s in "robot", will be colored green or yellow only if the letter also appears multiple times in the answer; otherwise, excess repeating letters will be colored gray.

# Project Details

The words.js file declares two arrays. The first, `VALID_GUESSES`, is an array of all legal guesses that the player is allowed to make. This is an array of over 12,000 words. The second, `SOLUTIONS`, is an array of all the possible solutions. It is a subset of the first. Hence, there will be some words that the player is allowed to guess but will not be included in the solutions. Examples are very uncommon words like "abaci" and 'strange' words like "aargh". A player may guess these words if they deem necessary.

When the game is started, a random word will be chosen from the possible solutions and the player has atttempts to guess the word. All guesses must have exactly 5 letters. If a player enters a guess that has less than 5 letters or is not in the array of legal guesses, `VALID_GUESSES`, an alert will appear, prompting the user to enter a valid guess.

In the original version of Wordle, players only get one game per day. However, this clone allows users to play as many times as they'd like. To play again, simply reload the page or click on the bold "Wordle" heading at the top of the page,

The main.js file describes the rules of the game and processes input from the user.

The main web page is in index.html. The page will automatically resize to fit a number of different
display widths (within reason). To enter a word, simply use the keyboard and press enter to submit.
If on a mobile device (or if you prefer), use the virtual keyboard to enter, delete, and submit letters.

Styles are defined in styles.css

This was CS50x 2022!
