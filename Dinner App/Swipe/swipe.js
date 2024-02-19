document.addEventListener('DOMContentLoaded', function () {
    let cooldown = 500; // 0.5 second cooldown
    let isAnimationInProgress = false;
    let isCardEnlarged = false;

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

        card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        card.style.transform = side === 'right' ? 'translateX(100%) scale(0.5)' : 'translateX(-100%) scale(0.5)';
        card.style.opacity = 0;

        setTimeout(() => {
            card.remove();
            createCard();
            isAnimationInProgress = false;
            isCardEnlarged = false; // Reset the card enlargement state
        }, cooldown);
    }

    document.addEventListener('click', function (e) {
        if (isAnimationInProgress) {
            return;
        }

        let middleX = window.innerWidth / 2;
        let side = e.clientX > middleX ? 'right' : 'left';

        let existingCard = document.querySelector('.card');

        if (existingCard) {
            if (side === 'right') {
                if (!isCardEnlarged){
                    console.log("Initial Approval")
                }
                if (isCardEnlarged) {
                    // If the card is enlarged, open a new window on right-click
                    if (side === 'right') {
                        window.open('https://example.com', '_blank');
                        console.log("Approval")
                        isCardEnlarged = false;
                    } else {
                        // If not right-clicked, perform the regular animation
                        slideAndDisappear(existingCard, side);
                        console.log("Disapproval")
                    }
                } else {
                    // If the card is not enlarged, enlarge it
                    existingCard.style.transition = 'transform 0.5s ease';
                    existingCard.style.transform = 'scale(1.5)';
                    isCardEnlarged = true;
                }
            } else {
                // Left-click animation
                slideAndDisappear(existingCard, side);
                console.log("Disapproval")
            }
        } else {
            createCard();
        }
    });

    // Initial card creation
    createCard();
});
