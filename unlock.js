// =====================================
// TRAVEL GALLERY PUZZLE
// =====================================

const puzzleWords = [
  "beach",
  "island",
  "travel",
  "camera",
  "sunset",
  "journey",
  "adventure",
  "passport",
  "holiday",
  "explore",
  "mountain",
  "ocean",
  "tropical",
  "wander",
  "gallery"
];

const correctWord =
  puzzleWords[Math.floor(Math.random() * puzzleWords.length)];

function scrambleWord(word) {
  const letters = word.split("");

  for (let i = letters.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = letters[i];
    letters[i] = letters[randomIndex];
    letters[randomIndex] = temp;
  }

  return letters.join("");
}

let scrambledWord = scrambleWord(correctWord);

while (scrambledWord === correctWord) {
  scrambledWord = scrambleWord(correctWord);
}

// Show scrambled word
document.getElementById("scrambled-word").textContent =
  scrambledWord.toUpperCase();


// Check answer
document.getElementById("unlock-button").addEventListener("click", function () {

  const answer = document
    .getElementById("answer")
    .value
    .toLowerCase()
    .trim();

  const message = document.getElementById("message");

  if (answer === correctWord) {

    message.textContent = "✓ Correct! Welcome!";

    sessionStorage.setItem("galleryUnlocked", "true");

    setTimeout(function () {
      window.location.href = "index.html";
    }, 500);

  } else {

    message.textContent = "❌ Incorrect. Try again!";

  }

});


// Allow Enter key
document.getElementById("answer").addEventListener("keydown", function(event) {

  if (event.key === "Enter") {
    document.getElementById("unlock-button").click();
  }

});
