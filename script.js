document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        const carShow = () => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.send();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve(JSON.parse(request.responseText));
                    } else {
                        reject('Произошла ошибка');
                    }
                });
            });
        };
        carShow().then((data) => {
            data.cars.forEach(item => {
                if (select.value === 'no') {
                    output.innerHTML = 'выбери тачку';
                }
                if (item.brand === select.value) {
                    const {brand, model, price} = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                }
            });
        })
        .catch((err) => {
            output.innerHTML = err;
        });
    });

});