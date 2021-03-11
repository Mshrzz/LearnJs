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

export default countTimer;