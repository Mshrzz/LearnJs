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

        btnMenu.addEventListener('click', handlerMenu);

        // closeBtn.addEventListener('click', handlerMenu);

        // menuItems.forEach( elem => elem.addEventListener('click', handlerMenu) );

        menu.addEventListener('click', (event) => {
            let target = event.target;

            if ( target.matches('a') ) {
                handlerMenu();
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

    // Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
              btn = document.querySelectorAll('.portfolio-btn'),
              dotsContainer = document.querySelector('.portfolio-dots'),
            //   dot = document.querySelectorAll('.dot'),
              slider = document.querySelector('.portfolio-content');
        let dot;

        let currentSlide = 0,
            interval;

        const addDots = () => {

            for (let i = 0; i < slide.length; i++) {
                let dotElem = document.createElement('li');
                dotElem.classList.add('dot');
                dotsContainer.append(dotElem);
            }

            dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');
        };

        addDots();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if ( currentSlide >= slide.length ) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {

            event.preventDefault();

            let target = event.target;

            if ( !target.matches('.portfolio-btn, .dot') ) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if ( target.matches('#arrow-right') ) {

                currentSlide++;

            } else if ( target.matches('#arrow-left') ) {

                currentSlide--;

            } else if ( target.matches('.dot') ) {

                dot.forEach( (item, index) => {

                    if ( item === target ) {

                        currentSlide = index;

                    }

                });
            }

            if ( currentSlide >= slide.length ) {
                currentSlide = 0;
            }

            if ( currentSlide < 0 ) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if ( event.target.matches('.portfolio-btn') || event.target.matches('.dot') ) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (  event.target.matches('.portfolio-btn') || event.target.matches('.dot') ) {
                startSlide();
            }
        });

        startSlide(1500);


    };

    slider();

    const regExps = () => {

        const calcBlock = document.querySelector('.calc-block'),
              footerForm = document.querySelector('.footer-form-input');

        calcBlock.addEventListener('input', (e) => {
            let target = e.target;

            if (target.matches('input')) {
                target.value = target.value.replace(/\D/g, '');
            }
        });


        document.addEventListener('focusout', e => {

            let target = e.target;

            if (e.target.matches('input')) {
                
                target.value = target.value.replace(/^(\s+)|(\s+)$/g, '');
                target.value = target.value.replace(/[\s]{2,}/g, ' ');
                target.value = target.value.replace(/[\-]{2,}/, '-');

                if (target.matches('#form2-name') || target.matches('#form2-message')) {
                    target.value = target.value.replace(/[^а-яё\-\ ]/gi, '');
                    if (target.matches('#form2-name')) {
                        target.value = target.value.replace(/^[а-яё]/, function (nameChar) { return nameChar.toUpperCase(); } );
                    }
                }

                if (target.matches('#form2-email')) {
                    target.value = target.value.replace(/[^\w\@\-\_\.\!\~\*\'']/gi, '');
                }

                if (target.matches('#form2-phone')) {
                    target.value = target.value.replace(/[^\d\(\)\-]/, '');
                }

                if (target.matches('input') && target.classList.contains('calc-item')) {
                    target.value = target.value.replace(/\D/g, '');
                }


            }
          });

        footerForm.addEventListener('input', (e) => {
            let target = e.target;

            if (target.matches('#form2-name') || target.matches('#form2-message')) {
                target.value = target.value.replace(/[^а-яё\-\ ]/gi, '');
            }

            if (target.matches('#form2-email')) {
                target.value = target.value.replace(/[^\w\@\-\_\.\!\~\*\'']/gi, '');
            }

            if (target.matches('#form2-phone')) {
                target.value = target.value.replace(/[^\d\(\)\-]/, '');
            }
        });


    };

    regExps();

    // Calculator
    const calculator = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
              calcType = document.querySelector('.calc-type'),
              calcSquare = document.querySelector('.calc-square'),
              calcCount = document.querySelector('.calc-count'),
              calcDay = document.querySelector('.calc-day'),
              totalValue = document.getElementById('total');

        const countSum = () => {

            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = +calcType.options[calcType.selectedIndex].value,
                  squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if ( calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if ( calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price*typeValue*squareValue * countValue * dayValue;
            } 

            // totalValue.textContent = total;
            let x = 1;

            const animateNumbers = () => {

                const requestId = requestAnimationFrame(animateNumbers);

                x= x * 2;
                totalValue.textContent = x;

                if (x >= total) {
                    totalValue.textContent = total;
                    cancelAnimationFrame(requestId);
                }
            };

            requestAnimationFrame(animateNumbers);
        };

        calcBlock.addEventListener('change', (e) => {
            const target = e.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calculator(100);

    // Our team block
    const ourTeamChangePhoto = () => {
        const commandBlock = document.getElementById('command');

        commandBlock.addEventListener('mouseover', (e) => 
            [e.target.dataset.img, e.target.src] = [e.target.src, e.target.dataset.img]);
        commandBlock.addEventListener('mouseout', (e) => 
        [e.target.src, e.target.dataset.img] = [e.target.dataset.img, e.target.src]);

    };

    ourTeamChangePhoto();

});