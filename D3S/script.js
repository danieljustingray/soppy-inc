const words = [
    "Elephant", "Windows Aero", "Windows 7", "Soppy Inc.", "HTML", 
    "Albert Heijn", "Burenburg", "AzollI22", "CSS", "Farel", 
    "Bliss (XP)", "Google", "Lessontable", "Ruggedroll'd", "Magister", 
    "Rostermaker", "Poker Face", "Lady A", "Frutiger Aero", "Ample Time",
    "Independent woman", "grotesque", "Weird al Yankovic", "Amish paradise",
    "White 'n Nerdy", "Minesweeper", "Internet explorer", "Minecraft"
  ];
  
  const wordList = document.getElementById("wordList");
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const timerElement = document.getElementById("timer");
  
  let intervalId;
  let currentIndex = 0;
  let timeLeft = 30;
  
  function startGame() {
    currentIndex = 0;
    displayWords();
    startBtn.style.display = "none";
    nextBtn.style.display = "block";
    intervalId = setInterval(updateTimer, 1000); // Update timer every second
  }
  
  function displayWords() {
    wordList.innerHTML = "";
    const selectedWords = shuffleArray(words).slice(0, 5);
    selectedWords.forEach(word => {
      const wordItem = document.createElement("div");
      wordItem.textContent = word;
      wordList.appendChild(wordItem);
    });
  }
  
  function nextWord() {
    currentIndex++;
    if (currentIndex >= words.length) {
      clearInterval(intervalId);
      wordList.innerHTML = "<h2>Game Over!</h2>";
      nextBtn.style.display = "none";
      startBtn.style.display = "block";
    } else {
      displayWords();
      timeLeft = 30; // Reset time left for the next round
    }
  }
  
  function updateTimer() {
    if (timeLeft > 0) {
      timerElement.textContent = `Time left: ${timeLeft} seconds`;
      timeLeft--;
    } else {
      clearInterval(intervalId);
      timerElement.textContent = "Time's up!";
      alert("Time's up!");
    }
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  startBtn.addEventListener("click", startGame);
  nextBtn.addEventListener("click", nextWord);
  