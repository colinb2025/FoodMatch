//if it goes through all of the restaurants in the criteria, give them the restaurant
//that had the most hesitation (time spent before swipe)

const slider1 = document.getElementById("slider1");
const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");

const slider2 = document.getElementById("slider2");
const circle3 = document.getElementById("circle3");
const circle4 = document.getElementById("circle4");
const label3 = document.getElementById("label3");
const label4 = document.getElementById("label4");

function initializeDragging1(slider, circle, label, index, otherCircle) {
  let isDragging = false;
  let initialMouseX, initialLeft;

  circle.addEventListener("mousedown", (event) => {
    isDragging = true;
    initialMouseX = event.clientX;
    initialLeft = parseFloat(circle.style.left) || (index === 0 ? 4 : 96);
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const deltaX = event.clientX - initialMouseX;
      let newPosition = initialLeft + (deltaX / slider.offsetWidth) * 100;

      // Ensure the circle stays within its respective slider range
      if (index === 0) {
        newPosition = Math.max(5, Math.min(newPosition, 89)); // Left circle range: 4-92%
      } else {
        newPosition = Math.max(11, Math.min(newPosition, 96.5)); // Right circle range: 8-100%
      }

      // Check if the circles overlap
      const radius = circle.offsetWidth / 2;
      const distanceBetweenCircles = Math.abs(
        parseFloat(circle.style.left) - parseFloat(otherCircle.style.left) - 2
      );
      const minDistance = (3 / 4) * radius;

      if (
        (index === 0 &&
          newPosition + minDistance > parseFloat(otherCircle.style.left)) ||
        (index === 1 &&
          newPosition - minDistance < parseFloat(otherCircle.style.left))
      ) {
        newPosition =
          index === 0
            ? parseFloat(otherCircle.style.left) - minDistance
            : parseFloat(otherCircle.style.left) + minDistance;
      }

      // Map position values to price ranges only for the bottom slider
      if (slider === slider2) {
        let priceRange;
        if (newPosition <= 25) {
          priceRange = "$";
        } else if (newPosition <= 50) {
          priceRange = "$$";
        } else if (newPosition <= 75) {
          priceRange = "$$$";
        } else {
          priceRange = "$$$$";
        }
        label.innerText = priceRange;
      } else {
        label.innerText = `${(((newPosition - 4) / 92) * 100).toFixed(0) - 1}`;
      }

      circle.style.left = `${newPosition}%`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

function initializeDragging2(slider, circle, label, index, otherCircle) {
  let isDragging = false;
  let initialMouseX, initialLeft;

  circle.addEventListener("mousedown", (event) => {
    isDragging = true;
    initialMouseX = event.clientX;
    initialLeft = parseFloat(circle.style.left) || 100;
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const deltaX = event.clientX - initialMouseX;
      let newPosition = initialLeft + (deltaX / slider.offsetWidth) * 100;

      // Ensure the circle stays within its respective slider range
      newPosition = Math.max(5, Math.min(newPosition, 96.5)); // Left circle range: 5-96.5

      // Map position values to the entire range of the slider (0-100)
      const mappedPosition = ((newPosition - 5) / 91.5) * 100;
      label.innerText = Math.round(mappedPosition);

      // Ensure the circle stays within the slider bounds
      const circleWidth = circle.offsetWidth;
      const halfCircleWidth = circleWidth / 2;
      const minPosition = 0;
      const maxPosition = 96.5;

      newPosition = Math.max(minPosition, Math.min(newPosition, maxPosition));

      circle.style.left = `${newPosition}%`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

// Ensure initial distance
const initialDistance = (3 / 4) * circle1.offsetWidth;
circle2.style.left = `${parseFloat(circle1.style.left) + initialDistance}%`;

// Initialize dragging for both sets of circles
initializeDragging2(slider1, circle2, label2, 1, circle1);

initializeDragging1(slider2, circle3, label3, 0, circle4);
initializeDragging1(slider2, circle4, label4, 1, circle3);

function getPriceRange(circle) {
  let newPosition = parseFloat(circle.style.left);
  let priceRange;

  if (newPosition <= 25) {
    priceRange = "$";
  } else if (newPosition <= 50) {
    priceRange = "$$";
  } else if (newPosition <= 75) {
    priceRange = "$$$";
  } else {
    priceRange = "$$$$";
  }

  return priceRange;
}


//-------------------------------------------------------------------------------------------------


const selectedWords = [];

function toggleButton(button, food) {
  const index = selectedWords.indexOf(food);

  if (index === -1) {
    selectedWords.push(food);
  } 
  
  else {
    selectedWords.splice(index, 1);
  }

  button.classList.toggle("clicked");
  button.classList.toggle("small");
}


//-------------------------------------------------------------------------------------------------


function resetEverything() {
  // Reset the first slider and circles
  resetSlider(circle2, label2, 96.5);

  label2.innerText = "100"

  // Reset the second slider and circles
  resetSlider(circle3, label3, 5);
  resetSlider(circle4, label4, 96.5);

  label3.innerText = "$"
  label4.innerText = "$$$$"

  // Reset buttons
  resetButtons();

  // Clear the list
  clearList();
}

function resetSlider(circle, label, initialPosition) {
  circle.style.left = `${initialPosition}%`;
  label.innerText = `${(((initialPosition - 4) / 92) * 100).toFixed(0) - 1}`;
  const initialDistance = (3 / 4) * circle.offsetWidth;
  resetOtherCircle(circle, initialDistance);
}

function resetOtherCircle(circle, initialDistance) {
  const otherCircle = circle === circle1 ? circle2 : circle1;
  otherCircle.style.left = `${parseFloat(circle.style.left) + initialDistance}%`;
}

function resetButtons() {
  const buttons = document.querySelectorAll(".grid-button");
  buttons.forEach((button) => {
    button.classList.remove("clicked", "small");
  });

  selectedWords.length = 0; // Clear the selectedWords array
}

function clearList() {
  selectedWords.length = 0;  
  console.log("List cleared!");
}


//-------------------------------------------------------------------------------------------------


function searchEverything() {
  const position1 = parseInt(label2.innerText, 10);

  console.log("Distance Range: Less than " + position1 + " mi");
  console.log("Price Range: " + getPriceRange(circle3) + " - " + getPriceRange(circle4));

  console.log(selectedWords);

  goToSwipePage();
}


function goToSwipePage() {
  window.location.href = '/Dinner%20App/Swipe/swipe.html';
}