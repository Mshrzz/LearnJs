'use strict';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function start() {

    let incomeMoney = 0;

    do {
        incomeMoney = parseInt(prompt('Ваш месячный доход?'));
    }
    while(!isNumber(incomeMoney));

    return incomeMoney;
}

const money = start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 500000,
    period: 12,
    asking: function() {

        let itemIncome, 
            cashIncome, 
            addExpenses, 
            addExpensesOut = [];

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {

            do {
                itemIncome = prompt('Какой у вас дополнительный источник заработка?');
            }
            while ( (itemIncome === null) || (itemIncome.trim() === '') || (isNumber(parseFloat(itemIncome))) );
            
            do {
                cashIncome = parseFloat(prompt('Сколько в месяц вы на этом зарабатываете?'));
            } 
            while( !isNumber(cashIncome) );

            appData.income[itemIncome] = cashIncome;

        }

        // Здесь контролируется корректность ввода статьи обязательных расходов

        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        }
        while( (addExpenses === null) || (addExpenses.trim() === '') || (isNumber(parseFloat(addExpenses))) );

        // Полученную строку с расходами дробим на массив
        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        // Пересобираем этот массив, каждому элементу делаем первую букву большой
        // В конце каждого элемента (кроме последнего) добавляем разделитель - @
        // Полученный массив присваиваем addExpensesOut

        for (let i = 0; i < appData.addExpenses.length; i ++) {

            if ( i === appData.addExpenses.length - 1) {
                addExpensesOut += appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substring(1);
                continue;
            }

            addExpensesOut += appData.addExpenses[i].charAt(0).toUpperCase() + 
                              appData.addExpenses[i].substring(1) + '@';
        }

        // Полученный оформленный массив присваиваем свойству appData.addExpences
        appData.addExpenses = addExpensesOut.split('@');
        // Склеиваем и выводим в консоль
        console.log(appData.addExpenses.join(', '));

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for ( let i = 0; i < 2; i++ ) {
            let parseValue = 0;
            let expensesKey = prompt('Введите обязательную статью расходов?');
            let expensesProp;
            do {
                parseValue = parseInt(prompt('Во сколько это обойдется?'));
                let chooseNumToArr = isNumber(parseValue) ? expensesProp = parseValue: parseValue = NaN;
            }
            while ( !isNumber(parseValue) );
            appData.expenses[expensesKey] = expensesProp;
        }

    },
    getExpensesMonth: function() {

        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }

        return `Ваши расходы за месяц: ${appData.expensesMonth}`;

    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
        return appData.budgetMonth;
    },
    getTargetMonth: function() {

        const targetTime = Math.ceil(appData.mission/appData.getBudget());

        if ( targetTime >= 0 ) {
            return `Срок достижения цели ${targetTime} месяцев`;
        } else if ( targetTime < 0 ) {
            return `Цель не будет достигнута`;
        } else {
            return `Время достижения цели неопределённое`;
        }
    },
    getStatusIncome: function() {

        let budgetDay = Math.floor(appData.getBudget()/30);

        if ( budgetDay >=  1200 ) {
            return ('У вас высокий уровень дохода');
        } else if ( (budgetDay >= 600) && (budgetDay <= 1200) ) {
            return ('У вас средний уровень дохода');
        } else if ( (budgetDay >= 0) && (budgetDay <= 600) ) {
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }

    },
    getInfoDeposit: function() {

        if (appData.deposit) {

            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            }
            while ( !isNumber(appData.percentDeposit) );

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while ( !isNumber(appData.moneyDeposit) );

        }

    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
console.log(appData.getExpensesMonth());
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(`Наша программа включает в себя данные: `);
for (let key in appData) {
    console.log(key + ' : ' + appData[key]);
}
appData.getInfoDeposit();