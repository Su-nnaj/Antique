document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('.burger-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuItems = document.querySelectorAll('.mobile-menu ul li');

    function toggleMenu() {
        burgerIcon.classList.toggle('open');
        mobileMenu.classList.toggle('open');

        menuItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1 + 0.3}s`;
            }
        });
    }

    function closeMenu() {
        burgerIcon.classList.remove('open');
        mobileMenu.classList.remove('open');
        menuItems.forEach(item => {
            item.style.animation = '';
        });
    }

    function closeMenuOnResize() {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    }

    burgerIcon.addEventListener('click', toggleMenu);

    // Add event listeners for menu items
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Add event listener for window resize
    window.addEventListener('resize', closeMenuOnResize);

    // Initial check in case the page loads in desktop mode with menu open
    closeMenuOnResize();

    // Function to handle page transitions
    function handlePageTransition(event, linkId) {
        const link = document.getElementById(linkId);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(function() {
                    window.location.href = e.target.href;
                }, 500);
            });
        }
    }

    // Function to fade in the page on load
    function fadeInPage() {
        document.body.style.opacity = 0;
        window.onload = function() {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = 1;
        };
    }

    // Check if we're on the index page or the menu page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        handlePageTransition(event, 'coffee-menu-link');
    } else if (window.location.pathname.includes('menu.html')) {
        fadeInPage();
    }
});
