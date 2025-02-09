document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.item-btn');
    const coinCountEl = document.getElementById('coin-count');
    const coinContainer = document.getElementById('coin-container');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const storeBtn = document.getElementById('store-btn');
    const recyclingSection = document.getElementById('recycling-section');
    const storeSection = document.getElementById('store-section');
    const redeemButtons = document.querySelectorAll('.redeem-btn');

    let totalCoins = 0;

    // Load coins from cookies
    if (document.cookie.includes('totalCoins=')) {
        totalCoins = parseInt(document.cookie.replace(/(?:(?:^|.*;\\s*)totalCoins\\s*\\=\\s*([^;]*).*$)|^.*$/, '$1'));
        coinCountEl.textContent = totalCoins;
    }

    // Store button handling
    storeBtn.addEventListener('click', () => {
        if (storeSection.classList.contains('hidden')) {
            recyclingSection.classList.add('hidden');
            storeSection.classList.remove('hidden');
            storeBtn.textContent = 'Back to Recycling';
        } else {
            recyclingSection.classList.remove('hidden');
            storeSection.classList.add('hidden');
            storeBtn.textContent = 'Store';
        }
    });

    // Redeem buttons handling
    redeemButtons.forEach(button => {
        button.addEventListener('click', () => {
            const price = parseInt(button.getAttribute('data-price'));
            if (totalCoins >= price) {
                totalCoins -= price;
                coinCountEl.textContent = totalCoins;
                document.cookie = `totalCoins=${totalCoins};path=/`;
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity';
                successMessage.textContent = 'Successfully redeemed! Check your email for details.';
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 300);
                }, 3000);
            } else {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity';
                errorMessage.textContent = 'Not enough coins!';
                document.body.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    setTimeout(() => errorMessage.remove(), 300);
                }, 3000);
            }
        });
    });

    // Recycling buttons handling
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            let coins;
            switch (button.id) {
                case 'bottle-btn':
                    coins = 10;
                    break;
                case 'can-btn':
                    coins = 15;
                    break;
                case 'other-btn':
                    coins = 20;
                    break;
                default:
                    coins = 10;
            }
            
            totalCoins += coins;
            coinCountEl.textContent = totalCoins;
            document.cookie = `totalCoins=${totalCoins};path=/`;
            createAndAnimateCoin(event.clientX, event.clientY);
        });
    });

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
