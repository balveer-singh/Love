const questionContainer = document.querySelector(".question-container");
// Corrected selector for resultContainer
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

let timeoutId; // Declare to store the timeout ID

// Function to move the 'No' button
function moveNoButton() {
  // Get the dimensions of the question container and the button
  const containerRect = questionContainer.getBoundingClientRect();
  const buttonRect = noBtn.getBoundingClientRect();

  // Calculate the maximum possible X and Y positions within the container
  // Subtract button dimensions to prevent it from going outside
  const maxX = containerRect.width - buttonRect.width - 20; // 20px padding
  const maxY = containerRect.height - buttonRect.height - 20; // 20px padding

  // Generate random positions
  // Ensure the button stays within the container's visible area
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  // Apply new position
  // Use 'translate' for better performance than 'left/top' as it doesn't trigger layout recalculations
  noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
  noBtn.style.position = 'absolute'; // Ensure absolute positioning for movement
}

// Initial positioning of the 'No' button
// It's good to call this once so it's not strictly "left: 54%" initially
moveNoButton();

// Event listener for 'No' button movement
noBtn.addEventListener("mouseover", moveNoButton);
// For touch devices, you might want to consider 'touchstart'
// noBtn.addEventListener("touchstart", moveNoButton);

// Yes button functionality
yesBtn.addEventListener("click", () => {
  // Hide the question and show the heart loader
  questionContainer.style.opacity = "0";
  questionContainer.style.pointerEvents = "none"; // Disable clicks on hidden container

  // A brief delay before hiding completely to allow opacity transition
  setTimeout(() => {
    questionContainer.style.display = "none";
    heartLoader.style.display = "block"; // Use block for visibility
  }, 500); // Match this delay with the CSS opacity transition duration

  // Set a timeout to hide the loader and show the result
  timeoutId = setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "block"; // Use block for visibility
    resultContainer.style.opacity = "1"; // Fade in result
    resultContainer.style.pointerEvents = "auto"; // Enable clicks on result
    gifResult.play(); // Play the GIF
  }, 3000); // Loader duration
});

// Optional: Clear timeout if the user somehow navigates away or refreshes before it completes
window.addEventListener('beforeunload', () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
