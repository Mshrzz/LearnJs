window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    // Timer
    let countTimer = function (deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

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

            let timeItems = [];

            timeItems.push(timer.hours.toString());
            timeItems.push(timer.minutes.toString());
            timeItems.push(timer.seconds.toString());

            for (let i = 0; i < timeItems.length; i++) {
                if ( timeItems[i].length === 1 ) {
                    let elem = timeItems[i].split('');
                    elem.unshift('0');
                    elem = elem.join('');
                    timeItems[i] = elem;
                }
            }

            timerHours.textContent = timeItems[0];
            timerMinutes.textContent = timeItems[1];
            timerSeconds.textContent = timeItems[2];

            if ( (timer.timeRemaining === 0) || (timer.timeRemaining < 0) ) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                // countTimer(timer.dateNow);
                clearInterval(intervalTimer);
            }
        }

        updateClock();
    }

    //countTimer('26 feb 2021');
    let intervalTimer = setInterval(countTimer, 1000, '26 feb 2021 03:43:00');
});