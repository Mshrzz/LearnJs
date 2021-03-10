'use strict';

const input = document.getElementById('first'),
      result = document.getElementById('second'),
      select1 = document.getElementById('coinTypes1'),
      select2 = document.getElementById('coinTypes2'),
      btnChange = document.getElementById('changeButton'),
      btnConvert = document.getElementById('convertButton');

// input control
const inputControl = () => {

    document.body.addEventListener('input', (event) => {
        let target = event.target;

        if (target.matches('#first')) {
            target.value = target.value.replace(/[^\d\.\,]/, '');
        }
    });

};

inputControl();

// getting actual coin value 
const actualCoin = () => {
    return fetch('https://api.exchangeratesapi.io/latest').then( result => {return result.json()});
};

// changer
const changer = () => {

   btnChange.addEventListener('click', () => {
    
    [result.textContent, input.value] = [input.value, result.textContent];

    [select1.options.selectedIndex, select2.options.selectedIndex] = [select2.options.selectedIndex, select1.options.selectedIndex];

   });
};

changer();

// converting logic
const converting = () => {
    btnConvert.addEventListener('click', () => {

        let select1opt = select1.options[select1.options.selectedIndex].value;
        let select2opt = select2.options[select2.options.selectedIndex].value;

        actualCoin().then((coin) => {

            let firstRatio = 1/coin.rates[select1opt];
            let secondRatio = coin.rates[select2opt];

            if (select1opt === 'EUR') {
                firstRatio = 1;   
            }

            if (select2opt === 'EUR') {
                secondRatio = 1;
            }

            let firstCoinValue = +input.value * firstRatio;

            result.textContent = (firstCoinValue*secondRatio).toFixed(4);

        })
        .catch((err) => console.error(err));

    });
};

converting();