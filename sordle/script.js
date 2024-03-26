document.addEventListener('DOMContentLoaded', function () {
    const wordList = ['words']; //word of today
    const secretWord = pickRandomWord(wordList);
    let attemptsLeft = 6;
    let guessedWord = '';
    let pastGuesses = [];
  
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const resultDisplay = document.getElementById('result');
    const attemptsLeftDisplay = document.getElementById('attemptsLeft');
    const pastGuessesDisplay = document.getElementById('pastGuesses');
  
    function pickRandomWord(words) {
      return words[Math.floor(Math.random() * words.length)];
    }
  
    function updateResultDisplay(result) {
      resultDisplay.textContent = result;
    }
  
    function updateAttemptsLeftDisplay() {
      attemptsLeftDisplay.textContent = attemptsLeft;
    }
  
    function updatePastGuessesDisplay() {
      pastGuessesDisplay.innerHTML = `<strong>Past Guesses:</strong> ${pastGuesses.join(', ')}`;
    }
  
    function checkGuess() {
      const guess = guessInput.value.toLowerCase();
      if (guess.length !== 5 || !/^[a-zA-Z]+$/.test(guess)) {
        alert('Please enter a valid five-letter word.');
        return;
      }
      if (guess === secretWord) {
        updateResultDisplay('Congratulations! You guessed the word. (words)');
        guessButton.disabled = true;
      } else {
        const result = getResult(guess);
        pastGuesses.push(guess);
        updateResultDisplay(result);
        updatePastGuessesDisplay();
        attemptsLeft--;
        updateAttemptsLeftDisplay();
        if (attemptsLeft === 0) {
          updateResultDisplay(`You're out of attempts. The word was ${secretWord}.`);
          guessButton.disabled = true;
        }
      }
      guessInput.value = '';
    }
  
    function getResult(guess) {
      let result = '';
      for (let i = 0; i < 5; i++) {
        if (guess[i] === secretWord[i]) {
          result += guess[i].toUpperCase();
        } else if (secretWord.includes(guess[i])) {
          result += '+';
        } else {
          result += '-';
        }
      }
      return result;
    }
  
    guessButton.addEventListener('click', checkGuess);
  });
  