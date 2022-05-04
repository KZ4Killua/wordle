const WORD_LENGTH = 5;
const GUESSES_ALLOWED = 6;

const GREEN = 'g';
const YELLOW = 'y';
const GRAY = 'a';

// Pick a random element from our SOLUTIONS as the day's solution
const solution = SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];

let guesses_made = 0;
let guess = "";
let game_over = false;

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


function enter_guess()
{
    // Check whether the word is five letters.
    if (guess.length !== WORD_LENGTH)
    {
        document.getElementById('output').innerHTML = "WORD MUST BE 5 LETTERS";
        return;
    }
    // Check whether the word is in the list of valid guesses.
    else if (!VALID_GUESSES.includes(guess))
    {
        document.getElementById('output').innerHTML = "INVALID WORD";
        return;
    }
    else
    {
        document.getElementById('output').innerHTML = "WORD ENTERED";
    }

    let pattern = get_pattern(guess, solution);
    
    // Get the right row and the letters in it
    let row_id = 'g' + String(guesses_made + 1);
    let row = document.getElementById(row_id);
    let letters = row.getElementsByTagName('td');

    
    for (let i = 0; i < WORD_LENGTH; i++)
    {
        // Style the cells in the table
        letters[i].innerHTML = guess[i].toUpperCase();
        letters[i].className = 'pattern-' + pattern.charAt(i);

        // Style the virtual keyboard
        key = document.getElementById('key-' + guess[i])
        if (key.className === '')
        {
            key.className = 'pattern-' + pattern[i];
        }
        else if (key.className === 'pattern-y' && pattern[i] === GREEN)
        {
            key.className = 'pattern-g';
        }
    }

    // Increase the number of guesses made.
    guesses_made += 1;
    // Clear the current guess
    guess = '';

    if (guesses_made === GUESSES_ALLOWED || pattern === 'ggggg')
    {
        game_over = true;
        document.getElementById('output').innerHTML = solution.toUpperCase();
    }
}

function input_letter(letter)
{
    // Make sure we have not already entered 5 letters
    if (guess.length === 5)
    {
        return;
    }
    // Identify the right row to work with
    let row_id = 'g' + String(guesses_made + 1);
    // Identify the right cell to work with
    let cell = document.getElementById(row_id).getElementsByTagName('td')[guess.length]
    // Update the cell
    cell.innerHTML = letter.toUpperCase();
    // Update the current guess
    guess += letter.toLowerCase();
}

function delete_letter()
{
    // Check if there are any letters to delete
    if (guess.length === 0)
    {
        return;
    }
    // Identify the right row to work with
    let row_id = 'g' + String(guesses_made + 1);
    // Identify the right cell to work with
    let cell = document.getElementById(row_id).getElementsByTagName('td')[guess.length - 1];
    // Update the cell
    cell.innerHTML = '';
    // Update the current guess
    guess = guess.substring(0, guess.length - 1)
}


function handle_input(input)
{
    // Block all input when game is over
    if (game_over)
    {
        return;
    }

    let key = input.key;
    // Button was clicked on physical keyboard
    if (input.type === 'keydown')
    {
        if (input.keyCode === 13)
        {
            input.preventDefault();
        }
       
        key = input.key;
    }
    // Button was clicked on virtual keyboard
    else
    {
        key = input.name;
    }

    // Handle keys
    if (key === "Enter")
    {
        enter_guess();
    }
    else if (key === "Backspace")
    {
        delete_letter();
    }
    else if (key.length === 1)
    {
        input_letter(key);
    }
}

document.addEventListener('keydown', function (e) {
    handle_input(e);
});