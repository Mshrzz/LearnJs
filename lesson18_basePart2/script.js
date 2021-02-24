'use strict';

const p1 = document.createElement('p'),
      p2 = document.createElement('p'),
      p3 = document.createElement('p'),
      p4 = document.createElement('p');

let date = new Date();

// доброе утро вечер и тд

let nowTime = date.getHours();

function dayGreet(currentTime) {

    if ( (currentTime >= 0) && (currentTime < 5) ) {
        return 'Доброй ночи';
    } else if ( (currentTime >= 5) && (currentTime<12) ) {
        return 'Доброе утро';
    } else if ( (currentTime >= 12 ) && (currentTime < 16) ){
        return 'Добрый день';
    } else if ( (currentTime >= 16 ) && (currentTime < 24) ) {
        return 'Добрый вечер';
    }

}
document.body.append(p1);
p1.textContent = dayGreet(nowTime);


// сегодня день недели
let todayDay = date.toLocaleString('ru', {weekday: 'long'});
let upperTodayDay = todayDay[0].toUpperCase() + todayDay.slice(1);

document.body.append(p2);
p2.textContent = `Сегодня ${upperTodayDay}`;

// Текущее время
let todayTime = date.toLocaleTimeString('en');

document.body.append(p3);
p3.textContent = todayTime;

// До нового года осталось

let nowNYDate = new Date();

let nowYear = nowNYDate.getFullYear(),
    nowMonth = nowNYDate.getMonth()+1,
    nowDate = nowNYDate.getDate();

let timeToNY = (Date.parse('2022-1-1') - Date.parse(`${nowYear}-${nowMonth+1}-${nowDate}`))/(1000*60*60*24);

document.body.append(p4);
p4.textContent = `Дней до нового года осталось: ${timeToNY}`;