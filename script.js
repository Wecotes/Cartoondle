let characters = [];
let targetCharacter;
let attempts = 0; // Track the number of guesses made

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
  const guess = document.getElementById("guessInput").value.trim().toLowerCase(); // Ensure no extra spaces and convert to lowercase

  // Find a character match
  const match = characters.find(char => char.name.toLowerCase() === guess);

  // Clear previous feedback
  document.getElementById("feedback").textContent = "";

  // If no match, show 'Character not found' message
  if (!match) {
    document.getElementById("feedback").textContent = "❌ Character not found. Try again!";
    return;
  }

  // Provide color-coded feedback for each category using emojis
  let feedbackMessage = `<strong>${match.name}</strong><br>`;
  feedbackMessage += `Show: ${match.show === targetCharacter.show ? "🟩" : "🟥"} ${match.show}<br>`;
  feedbackMessage += `Network: ${match.network === targetCharacter.network ? "🟩" : "🟥"} ${match.network}<br>`;
  feedbackMessage += `Role: ${match.role === targetCharacter.role ? "🟩" : "🟥"} ${match.role}<br>`;
  feedbackMessage += `Gender: ${match.gender === targetCharacter.gender ? "🟩" : "🟥"} ${match.gender || 'Unknown'}<br>`;
  feedbackMessage += `Species: ${match.species === targetCharacter.species ? "🟩" : "🟥"} ${match.species}<br>`;
  feedbackMessage += `Color: ${match.color === targetCharacter.color ? "🟩" : "🟥"} ${match.color}<br>`;
  feedbackMessage += `Debut Year: ${match.debut_year === targetCharacter.debut_year ? "🟩" : "🟥"} ${match.debut_year}`;

  document.getElementById("feedback").innerHTML = feedbackMessage;

  // Add this guess to the list with emoji feedback, adding it at the top
  const guessList = document.getElementById("guessList");
  const listItem = document.createElement("li");

  // Add the emoji feedback to each category
  listItem.innerHTML = `${match.name}: <strong>${match.name}</strong><br>
    Show: ${match.show === targetCharacter.show ? '🟩' : '🟥'} ${match.show}<br>
    Network: ${match.network === targetCharacter.network ? '🟩' : '🟥'} ${match.network}<br>
    Role: ${match.role === targetCharacter.role ? '🟩' : '🟥'} ${match.role}<br>
    Gender: ${match.gender === targetCharacter.gender ? '🟩' : '🟥'} ${match.gender || 'Unknown'}<br>
    Species: ${match.species === targetCharacter.species ? '🟩' : '🟥'} ${match.species}<br>
    Color: ${match.color === targetCharacter.color ? '🟩' : '🟥'} ${match.color}<br>
    Debut Year: ${match.debut_year === targetCharacter.debut_year ? '🟩' : '🟥'} ${match.debut_year}`;

  // Insert the new guess at the beginning of the list (most recent on top)
  guessList.insertBefore(listItem, guessList.firstChild);

  // Track the number of guesses made
  attempts++;
  document.getElementById("attemptsLeft").textContent = `Guesses: ${attempts} made`;

  // Check if the guess matches the target character
  if (match.name === targetCharacter.name) {
    document.getElementById("feedback").innerHTML = `🎉 Correct! It was ${targetCharacter.name}!`;
    document.getElementById("submitGuess").disabled = true; // Disable the guess button
    document.getElementById("guessInput").disabled = true; // Disable input
    document.getElementById("restartButton").style.display = 'block'; // Show restart button
  } else {
    // No further changes needed for this as attempts are now tracked correctly
  }

  document.getElementById("guessInput").value = ''; // Clear the input field
}

// Restart the game
function restartGame() {
  attempts = 0; // Reset attempts
  document.getElementById("attemptsLeft").textContent = `Guesses: ${attempts} made`; // Reset the display
  document.getElementById("submitGuess").disabled = false;
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessInput").value = '';
  document.getElementById("feedback").textContent = '';
  document.getElementById("restartButton").style.display = 'none'; // Hide restart button
  pickRandomCharacter(); // Pick a new random character
}

// Helper function to populate the datalist for suggestions
function populateDatalist(data) {
  const datalist = document.getElementById("characterList");
  data.forEach(char => {
    const option = document.createElement("option");
    option.value = char.name;
    datalist.appendChild(option);
  });
}

document.getElementById("submitGuess").addEventListener("click", handleGuess);
document.getElementById("restartButton").addEventListener("click", restartGame);
