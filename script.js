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
    mission: 500000,
    period: 12,
    asking: function() {

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');

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
        return appData.budget - appData.expensesMonth;
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