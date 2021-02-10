'use strict';

const salaryAmount = document.querySelector('.salary-amount'), // Строка ввода месячного дохода
      // Блок: Дополнительный доход   
      incomeBlock = document.querySelector('.income'),
      buttonPlusIncome = incomeBlock.querySelector('button'),
      // Поля ввода для блока дополнительный доход  
      incomeItemsBlock = document.querySelector('.income-items'),
      inputIncomeTitle = incomeItemsBlock.querySelector('.income-title'),
      inputIncomeAmount = incomeItemsBlock.querySelector('.income-amount'),
      // Блок: Возможный доход
      inputAdditionalIncome1 = document.querySelectorAll('.additional_income-item')[0],
      inputAdditionalIncome2 = document.querySelectorAll('.additional_income-item')[1],
      // Блок: Обязательные расходы 
      expensesBlock = document.querySelector('.expenses'),
      buttonPlusExpenses = expensesBlock.querySelector('button'),
      // Поля ввода для блока обязательные расходы
      expensesItemsBlock = document.querySelector('.expenses-items'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      // Блок: Возможные расходы
      inputAdditionalExpenses = document.querySelector('.additional_expenses-item'),
      checkboxDeposit = document.querySelector('#deposit-check'),
      // Блок: Цель
      inputTargetAmount = document.querySelector('.target-amount'),
      // Блок: Период расчета
      selectPeriod = document.querySelector('.period-select'),
      // Блок: Доходы
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      // Блок: Кнопка расчета
      calculateButton = document.getElementById('start');

// Пока закоментируем нижний блок, чтобы не мешал

/*

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
        appData.addExpenses = addExpenses.toLowerCase().split(',');

        // Пересобираем этот массив, каждому элементу делаем первую букву большой
        // В конце каждого элемента (кроме последнего) добавляем разделитель - @
        // Полученный массив присваиваем addExpensesOut

        for (let i = 0; i < appData.addExpenses.length; i ++) {
            
            // Кусок с циклом while действует по такой логике:
            // Если у нас нулевой элемент пустая строка, то 
            // Мы смотрим пустой ли 1ый и тд
            // Если не пустой - делаем его заглавным

            let k = 0;

            while ( appData.addExpenses[i].charAt(k) === ' ' ) {
                k += 1;
            }

            if ( i === appData.addExpenses.length - 1) {
                addExpensesOut += appData.addExpenses[i].charAt(k).toUpperCase() + 
                                  appData.addExpenses[i].substring(k+1);
                continue;
            }

            addExpensesOut += appData.addExpenses[i].charAt(k).toUpperCase() + 
                              appData.addExpenses[i].substring(k+1) + '@';
        }

        // Полученный оформленный массив присваиваем свойству appData.addExpences
        appData.addExpenses = addExpensesOut.split('@');
        // Склеиваем и выводим в консоль
        console.log(appData.addExpenses.join(', '));

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let parseValue = 0,
            expensesKey,
            expensesProp;

        for ( let i = 0; i < 2; i++ ) {

            do {
                expensesKey = prompt('Введите обязательную статью расходов?');
            }
            while ( (expensesKey === null) || (expensesKey.trim() === '') || (isNumber(parseFloat(expensesKey))) );
            
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

*/