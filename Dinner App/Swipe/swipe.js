document.addEventListener('DOMContentLoaded', function () {
    let cooldown = 500; // 0.5 second cooldown
    let isAnimationInProgress = false;
  
    function createCard() {
      let cardContainer = document.getElementById('card-container');
      let card = document.createElement('div');
      card.className = 'card';
      card.style.backgroundColor = getRandomColor(); // Function to get a random color
      cardContainer.appendChild(card);
  
      return card;
    }
  
    function getRandomColor() {
      // Function to generate a random hex color
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
  
    function slideAndDisappear(card, side) {
      isAnimationInProgress = true;
  
      // Slide to the left or right based on the side
      card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      card.style.transform = side === 'right' ? 'translateX(100%) scale(0.5)' : 'translateX(-100%) scale(0.5)';
      card.style.opacity = 0;
  
      // After 0.5 seconds, remove the card from the container
      setTimeout(() => {
        card.remove();
        createCard();
        isAnimationInProgress = false;
      }, cooldown);
    }
  
    document.addEventListener('click', function (e) {
      if (isAnimationInProgress) {
        return;
      }
  
      let middleX = window.innerWidth / 2;
      let side = e.clientX > middleX ? 'right' : 'left';
  
      if (side === 'right') {
        console.log('Approval!');
      } else {
        console.log('Disapproval!');
      }
  
      let existingCard = document.querySelector('.card');
      
      if (existingCard) {
        slideAndDisappear(existingCard, side);
      } else {
        createCard();
      }
    });
  
    // Initial card creation
    createCard();
  });
  