window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    // Timer
    let countTimer = function (deadline) {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        function convertTimeNumber(num) {
            if ( num < 10 ) {
                num = '0' + num;
            }
            return num;
        }

        function getTimeRemaining() {

            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);
                return {timeRemaining, dateNow, hours, minutes, seconds};
        }

        function updateClock() {

            let timer = getTimeRemaining();

            timerHours.textContent = convertTimeNumber(timer.hours);
            timerMinutes.textContent = convertTimeNumber(timer.minutes);
            timerSeconds.textContent = convertTimeNumber(timer.seconds);

            if ( (timer.timeRemaining === 0) || (timer.timeRemaining < 0) ) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';

                clearInterval(myInterval);
            }
        }

        let myInterval = setInterval(updateClock, 1000);
    };

    countTimer('26 feb 2021 20:15:50');

    // Menu
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
    
    toggleMenu();

    // Popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
              popupFrame = document.querySelector('.popup-content'),
              popupBtn = document.querySelectorAll('.popup-btn');
        
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {

                popup.style.display = 'block';

                if ( window.innerWidth > 768 ) {

                    let count = 0;
                    let animation;

                    let timer = function () {

                        animation = requestAnimationFrame(timer);

                        count++;

                        if ( count >= 23 ) {
                            cancelAnimationFrame(animation);
                            return;
                        } else {
                            popupFrame.style.left = 2*count + '%';
                        }

                    };

                    timer();

                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if ( target.classList.contains('popup-close') ) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
            }
            
            if (!target) {
                popup.style.display = 'none';
            }
        });
    };

    togglePopUp();

    //  Tabs
    const tabs = () => {

        const tabHeader = document.querySelector('.service-header'),
              tab = tabHeader.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {

            for (let i = 0; i < tabContent.length; i++) {

                if ( index === i ) {

                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');

                } else {

                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');

                }
            }
        };

        tabHeader.addEventListener('click', (event) => {

            let target = event.target;
                target = target.closest('.service-header-tab');

            if (target) {

                tab.forEach( (item, index) => {

                    if ( item === target ) {
                        toggleTabContent(index);
                    }

                });
            }
            
        });
    };

    tabs();

});