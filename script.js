let characters = [];
let targetCharacter;
let attempts = 6; // Total attempts

// Load characters from JSON
fetch('characters.json')
  .then(res => res.json())
  .then(data => {
    characters = data;
    populateDatalist(data);
    pickRandomCharacter();
});

function pickRandomCharacter() {
  targetCharacter = characters[Math.floor(Math.random() * characters.length)];
  console.log("Target Character:", targetCharacter.name); // For debugging
}

function handleGuess() {
  const guess = document.getElementById("guessInput").value.trim().toLowerCase();
  const match = characters.find(char => char.name.toLowerCase() === guess);

  if (!match) {
    document.getElementById("feedback").textContent = "❌ Character not found. Try again!";
    return;
  }

  // Fill the character details based on the guess
  document.getElementById("show").textContent = match.show;
  document.getElementById("network").textContent = match.network;
  document.getElementById("role").textContent = match.role;
  document.getElementById("gender").textContent = match.gender || 'Unknown';
  document.getElementById("species").textContent = match.species;
  document.getElementById("color").textContent = match.color;
  document.getElementById("debutYear").textContent = match.debut_year;

  // Provide color-coded feedback for each category
  let feedbackMessage = `<strong>${match.name}</strong><br>`;
  feedbackMessage += `Show: ${match.show === targetCharacter.show ? "🟩" : "🟥"} ${match.show}<br>`;
  feedbackMessage += `Network: ${match.network === targetCharacter.network ? "🟩" : match.network === targetCharacter.network ? "🟨" : "🟥"} ${match.network}<br>`;
  feedbackMessage += `Role: ${match.role === targetCharacter.role ? "🟩" : "🟥"} ${match.role}<br>`;
  feedbackMessage += `Gender: ${match.gender === targetCharacter.gender ? "🟩" : "🟥"} ${match.gender || 'Unknown'}<br>`;
  feedbackMessage += `Species: ${match.species === targetCharacter.species ? "🟩" : "🟥"} ${match.species}<br>`;
  feedbackMessage += `Color: ${match.color === targetCharacter.color ? "🟩" : "🟥"} ${match.color}<br>`;
  feedbackMessage += `Debut Year: ${match.debut_year === targetCharacter.debut_year ? "🟩" : "🟥"} ${match.debut_year}`;

  document.getElementById("feedback").innerHTML = feedbackMessage;

  // Check if the guess matches the target character
  if (match.name === targetCharacter.name) {
    document.getElementById("feedback").innerHTML = `🎉 Correct! It was ${targetCharacter.name}!`;
    document.getElementById("submitGuess").disabled = true; // Disable the guess button
    document.getElementById("guessInput").disabled = true; // Disable input
    document.getElementById("restartButton").style.display = 'block'; // Show restart button
  } else {
    attempts--;
    document.getElementById("attemptsLeft").textContent = `${attempts} remaining`;
    if (attempts <= 0) {
      document.getElementById("feedback").innerHTML = `Game over! The correct answer was ${targetCharacter.name}.`;
      document.getElementById("submitGuess").disabled = true;
      document.getElementById("restartButton").style.display = 'block'; // Show restart button
    }
  }

  document.getElementById("guessInput").value = ''; // Clear the input field
}

// Restart the game
function restartGame() {
  attempts = 6;
  document.getElementById("attemptsLeft").textContent = `${attempts} remaining`;
  document.getElementById("submitGuess").disabled = false;
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessInput").value = '';
  document.getElementById("feedback").textContent = '';
  document.getElementById("restartButton").style.display = 'none'; // Hide restart button
  pickRandomCharacter();
}

// Helper function to populate the datalist for suggestions
function populateDatalist(data) {
  const datalist = document.getElementById("characterList");
  datalist.innerHTML = ''; // Clear previous options
  data.forEach(char => {
    const option = document.createElement("option");
    option.value = char.name;
    datalist.appendChild(option);
  });
}


document.getElementById("submitGuess").addEventListener("click", handleGuess);
document.getElementById("restartButton").addEventListener("click", restartGame);
