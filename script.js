document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.item-btn');
    const coinCountEl = document.getElementById('coin-count');
    const coinContainer = document.getElementById('coin-container');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');

    let totalCoins = 0;

    // Load coins from cookies
    if (document.cookie.includes('totalCoins=')) {
        totalCoins = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)totalCoins\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
        coinCountEl.textContent = totalCoins;
    }

    // Event listeners for buttons
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const coins = 10; // Example coin value per button press
            totalCoins += coins;
            coinCountEl.textContent = totalCoins;

            // Save coins to cookies
            document.cookie = `totalCoins=${totalCoins};path=/`;

            // Create and animate a coin
            createAndAnimateCoin(event.clientX, event.clientY);
        });
    });

    // Create and animate a coin
    function createAndAnimateCoin(x, y) {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = `${x}px`;
        coin.style.top = `${y}px`;
        coinContainer.appendChild(coin);

        anime({
            targets: coin,
            translateX: [
                { value: Math.random() * 200 - 100, duration: 400 },
                { value: 0, duration: 800 }
            ],
            translateY: [
                { value: -150, duration: 400, easing: 'easeOutQuad' },
                { value: 0, duration: 800, easing: 'easeInQuad' }
            ],
            opacity: [
                { value: 1, duration: 400 },
                { value: 0, duration: 800 }
            ],
            duration: 1200,
            easing: 'easeInOutQuad',
            complete: () => {
                coin.remove();
            }
        });
    }

    // Cookie banner handling
    acceptCookies.addEventListener('click', () => {
        cookieBanner.style.display = 'none';
    });
});
