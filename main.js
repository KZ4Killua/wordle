const WORD_LENGTH = 5;
const GUESSES_ALLOWED = 6;

const GREEN = 'g';
const YELLOW = 'y';
const GRAY = 'a';

// Pick a random element from our SOLUTIONS as the day's solution
const solution = SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];
// Keep track of the number of guesses made
let guesses_made = 0;

/**
 * Returns the wordle pattern for a guess given a target solution.
 * @param {String} guess 
 * @param {String} solution 
 */
function get_pattern(guess, solution)
{
    let pattern = "";
    for (let i = 0; i < WORD_LENGTH; i++)
    {
        // Letter is at the right spot
        if (guess.charAt(i) === solution.charAt(i))
        {
            pattern += GREEN;
        }
        // Letter is not in the word
        else if (!solution.includes(guess.charAt(i)))
        {
            pattern += GRAY;
        }
        else
        {
            let n = 0;
            // Look ahead and count the number of greens of that letter
            for (let j = i + 1; j < WORD_LENGTH; j++)
            {
                if (solution.charAt(j) === guess.charAt(i) && solution.charAt(j) === guess.charAt(j))
                {
                    n += 1;
                }
            }
            // Count the number of occurences of that letter so far
            for (let j = 0; j < i + 1; j++)
            {
                if (guess.charAt(j) === guess.charAt(i))
                {
                    n += 1;
                }
            }
            // Count the number of occurences of the letter in the solution
            let m = 0;
            for (let j = 0; j < WORD_LENGTH; j++)
            {
                if (solution.charAt(j) === guess.charAt(i))
                {
                    m += 1;
                }
            }
            // If the solution has less than n of that letter, add a gray
            if (n > m)
            {
                pattern += GRAY;
            }
            else
            {
                pattern += YELLOW;
            }
        }
    }
    return pattern;
}

/**
 * Check whether a word matches a pattern gotten from an earlier guess.
 * @param {String} word 
 * @param {String} guess 
 * @param {String} pattern 
 */
function matches_pattern(word, guess, pattern) 
{
    return (get_pattern(guess, word) === pattern);
}


function enter_guess(guess)
{
    guess = guess.toLowerCase()

    // Check whether the word is five letters.
    if (guess.length !== WORD_LENGTH)
    {
        document.getElementById('output').innerHTML = "Word must be 5 letters!";
        return;
    }
    // Check whether the word is in the list of valid guesses.
    else if (!VALID_GUESSES.includes(guess))
    {
        document.getElementById('output').innerHTML = "Invalid word!";
        return;
    }
    else
    {
        document.getElementById('output').innerHTML = "Word submitted!";
    }

    let pattern = get_pattern(guess, solution);
    
    // Get the right row and the letters in it
    let row_id = 'g' + String(guesses_made + 1);
    let row = document.getElementById(row_id);
    let letters = row.getElementsByTagName('td');

    for (let i = 0; i < WORD_LENGTH; i++)
    {
        // Enter the each letter
        letters[i].innerHTML = guess[i].toUpperCase();
        // Change the style of each letter
        letters[i].className = pattern.charAt(i);
    }

    // Increase the number of guesses made.
    guesses_made += 1;

    // Clear the input field
    document.querySelector('#guess-text').value = '';

    if (guesses_made === GUESSES_ALLOWED || pattern === 'ggggg')
    {
        // Disable the form
        document.querySelector("#guess-text").setAttribute("disabled", "disabled");
        document.querySelector("#guess-submit").setAttribute("disabled", "disabled");
        // Show the solution
        document.querySelector("#output").innerHTML = solution.toUpperCase();
    }
}

// Listen for when the user enters a word
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(e) {
        enter_guess(document.querySelector('#guess-text').value);
        e.preventDefault();
    });
});