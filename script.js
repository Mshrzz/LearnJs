'use strict';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function start(incomeMoney) {

    do {
        incomeMoney = parseInt(prompt('Ваш месячный доход?'));
    }
    while(!isNumber(incomeMoney));

    return incomeMoney;
}

function showTypeOf(type){
    return typeof(type);
}

function getExpensesMonth(expensesMonthArray) {
    let sumNum = [];

    for ( let i = 0; i < 2; i++ ) {
        let parseValue = 0;
        expensesMonthArray[i] = prompt('Введите обязательную статью расходов?');
        do {
            parseValue = parseInt(prompt('Во сколько это обойдется?'));
            let chooseNumToArr = isNumber(parseValue) ? sumNum.push(parseValue) : parseValue = NaN;
        }
        while ( !isNumber(parseValue) );
    }
    return sumNum[0]+sumNum[1];
}

function getAccumulatedMonth(incomeMonth, getExpensesMonth) {
    return incomeMonth - getExpensesMonth;
}

function getTargetMonth(accumulatesInMonth, target) {

    const targetTime = Math.ceil(target/accumulatesInMonth);

    if ( targetTime >= 0 ) {
        return `Срок достижения цели ${targetTime} месяцев`;
    } else if ( targetTime < 0 ) {
        return `Цель не будет достигнута`;
    } else {
        return `Время достижения цели неопределённое`;
    }
}

function getStatusIncome(budgetForDay) {
    if ( budgetForDay >=  1200 ) {
        return ('У вас высокий уровень дохода');
    } else if ( (budgetForDay >= 600) && (budgetForDay <= 1200) ) {
        return ('У вас средний уровень дохода');
    } else if ( (budgetForDay >= 0) && (budgetForDay <= 600) ) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
}

const money = start(),
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      expensesArray = [],
      expensesAmount = getExpensesMonth(expensesArray),
      accumulatedMonth = getAccumulatedMonth(money, expensesAmount),
      budgetDay = money/30,
      income = 'freelance', 
      mission = 500000, 
      period = 12;

console.log(showTypeOf(money), ' ', showTypeOf(income), ' ', showTypeOf(deposit));

console.log('Расходы за месяц: ', expensesAmount);

console.log(addExpenses.toLowerCase().split(', '));

console.log(getTargetMonth(accumulatedMonth, mission));

console.log(`Ваш бюджет на день с учетом обязательных расходов: ${Math.floor(accumulatedMonth/30)}`);

console.log(getStatusIncome(budgetDay));