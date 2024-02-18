let card = document.getElementById('card');
    let container = document.getElementById('card-container');
    let thresholdPercentage = 0.4;
    let cooldown = 2500; // 1 second cooldown
    let lastApprovalTime = 0;
    let lastDisapprovalTime = 0;

    container.addEventListener('mousemove', function (e) {
        let middleX = window.innerWidth / 2;
        let deltaX = e.clientX - middleX;

        card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 10}deg)`;

        // Approval action when cursor is in the right 20% of the window
        if (e.clientX > window.innerWidth * (1 - thresholdPercentage)) {
            if (Date.now() - lastApprovalTime >= cooldown) {
                console.log('Approval!');
                lastApprovalTime = Date.now();
                initiateRotation(true);
            }
        }

        // Disapproval action when cursor is in the left 20% of the window
        if (e.clientX < window.innerWidth * thresholdPercentage) {
            if (Date.now() - lastDisapprovalTime >= cooldown) {
                console.log('Disapproval!');
                lastDisapprovalTime = Date.now();
                initiateRotation(false);
            }
        }
    });

    function initiateRotation(approve) {
        // Rotate infinitely with decreasing scale
        card.style.transition = 'transform 1s linear';
        card.style.transform = approve ? 'rotate(360deg) scale(0.5)' : 'rotate(-360deg) scale(0.5)';

        // Reset card position after a short delay
        setTimeout(() => {
            resetCardPosition();
        }, 1000);
    }

    function resetCardPosition() {
        // Reset card position
        card.style.transition = 'none';
        setTimeout(() => {
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'translateX(0) rotate(0)';
        }, 0);
    }
