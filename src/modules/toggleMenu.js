const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li>a'),
          handlerMenu = () => menu.classList.toggle('active-menu');

    document.body.addEventListener('click', (event) => {
        let target = event.target;

        if ( target.closest('.menu') ) {
            handlerMenu();
        } else if ( target.closest('menu') ) {
            if ( target.matches('menu a') ) {
                handlerMenu();
            }

        } else {
            menu.classList.remove('active-menu');
        }
    });
};

export default toggleMenu;