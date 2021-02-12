'use strict';

const salaryAmount = document.querySelector('.salary-amount'), // Строка ввода месячного дохода
      // Блок: Дополнительный доход   
      buttonPlusIncome = document.querySelector('.income_add'),
      // Поля ввода для блока дополнительный доход  
      incomeItem = document.querySelectorAll('.income-items'),
      inputIncomeTitle = document.querySelectorAll('.income-title')[1],
      inputIncomeAmount = document.querySelector('.income-amount'),
      // Блок: Возможный доход
      inputAdditionalIncome = document.querySelectorAll('.additional_income-item'),
      inputAdditionalIncome1 = document.querySelectorAll('.additional_income-item')[0],
      inputAdditionalIncome2 = document.querySelectorAll('.additional_income-item')[1],
      // Блок: Обязательные расходы 
      buttonPlusExpenses = document.querySelector('.expenses_add'),
      // Поля ввода для блока обязательные расходы
      expensesItemsBlock = document.querySelector('.expenses-items'),
      expensesTitle = document.querySelector('.expenses-title'),
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

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        let money = 0;

        // do {
        //     money = parseInt(prompt('Ваш месячный доход?'));
        // }
        // while(!isNumber(money));

        // if (salaryAmount.value === '') {
        //     alert('Ошибка! Поле "Месячный доход" должно быть заполнено');
        //     return;
        // }

        appData.budget = +salaryAmount.value;
        console.log(salaryAmount.value);

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    isBudgetEmpty: function() {

        while (salaryAmount.value === '') {
            alert('Вы дожны заполнить все обязательные поля!');
            return;
        }

    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        selectPeriod.addEventListener('change', function(event){
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');

        if ( expensesItems.length  === 3 ) {
            buttonPlusExpenses.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');

        if ( incomeItems.length === 3 ) {
            buttonPlusIncome.style.display = 'none';
        }  
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {

        incomeItems.forEach(function(item){

            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;

            if ( ((itemIncome !== null) && (itemIncome.trim() !== '') && (!isNumber(parseFloat(itemIncome)))) && 
                 (isNumber(parseFloat(cashIncome))) ) {

                    appData.income[itemIncome] = cashIncome;

                }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = inputAdditionalExpenses.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                appData.addIncome.push(itemValue);
            }
        });
    },
    changeRange: function(event) {
        let rangeIndicator = document.querySelector('.period-amount');
        rangeIndicator.textContent = event.target.value;
    },
    asking: function() {

        let itemIncome, 
            cashIncome, 
            addExpenses, 
            addExpensesOut = [];



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

    },
    getExpensesMonth: function() {

        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }

        return `Ваши расходы за месяц: ${appData.expensesMonth}`;

    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
        return appData.budgetMonth;
    },
    getTargetMonth: function() {

        const targetTime = Math.ceil(inputTargetAmount.value/appData.getBudget());

        if ( targetTime >= 0 ) {
            return targetTime;
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
        return appData.budgetMonth * selectPeriod.value;
    }
};

calculateButton.addEventListener('click', appData.start);
calculateButton.addEventListener('click', appData.isBudgetEmpty);

buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);

selectPeriod.addEventListener('change', appData.changeRange);

// console.log(`Наша программа включает в себя данные: `);
// for (let key in appData) {
//     console.log(key + ' : ' + appData[key]);
// }
// appData.getInfoDeposit();