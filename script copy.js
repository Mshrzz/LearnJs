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
      calculateButton = document.getElementById('start'),
      resetButton = document.getElementById('cancel');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function AppData () {
    this.budget =  0;
    this.budgetDay =  0;
    this.budgetMonth =  0;
    this.expensesMonth =  0;
    this.income =  {};
    this.incomeMonth =  0;
    this.addIncome =  [];
    this.expenses =  {};
    this.addExpenses =  [];
    this.deposit =  false;
    this.percentDeposit =  0;
    this.moneyDeposit =  0;
}

AppData.prototype.start = function() {
    let money = 0;

    this.budget = +salaryAmount.value;
    console.log(salaryAmount.value);

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.block(true);
};

AppData.prototype.block = function(isTrue) {

    const inputs = document.querySelectorAll('input');

    if (isTrue) {

        calculateButton.style.display = 'none';
        resetButton.style.display = 'block';

    } else {
        calculateButton.style.display = 'block';
        resetButton.style.display = 'none';

    }

    inputs.forEach(function(input){
        input.disabled = isTrue;
        if ( input.type ===  'range' ) {
            input.disabled = false;
        }
    });

};

AppData.prototype.reset = function() {

    const inputsReset = document.querySelectorAll('input');

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expenses = {};
    this.income = {};
    this.incomeMonth = 0;
    this.addExpenses = [];
    this.addIncome = [];
    this.expensesMonth = 0;

    this.block(false);

    inputsReset.forEach(function(input){
        input.value = '';
    });

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

};

AppData.prototype.isBudgetEmpty = function() {

    while (salaryAmount.value === '') {
        alert('Вы дожны заполнить все обязательные поля!');
        return;
    }

};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    const onRangeChange = selectPeriod.addEventListener('input', (function(event){
        incomePeriodValue.value = this.calcSavedMoney();
    }).bind(this));
};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');

    if ( expensesItems.length  === 3 ) {
        buttonPlusExpenses.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');

    if ( incomeItems.length === 3 ) {
        buttonPlusIncome.style.display = 'none';
    }  
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};

AppData.prototype.getIncome = function() {

    incomeItems.forEach(function(item){

        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = +item.querySelector('.income-amount').value;

        if ( ((itemIncome !== null) && (itemIncome.trim() !== '') && (!isNumber(parseFloat(itemIncome)))) && 
             (isNumber(parseFloat(cashIncome))) ) {

                this.income[itemIncome] = cashIncome;

            }
    }, this);

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = inputAdditionalExpenses.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
};

AppData.prototype.getAddIncome = function() {
    inputAdditionalIncome.forEach(function(item) {

        let itemValue = item.value.trim();

        if ( itemValue !== '' ) {
            this.addIncome.push(itemValue);
        }

    }, this);
};

AppData.prototype.changeRange = function(event) {
    let rangeIndicator = document.querySelector('.period-amount');
    rangeIndicator.textContent = event.target.value;
};

AppData.prototype.getExpensesMonth = function() {

    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }

    return `Ваши расходы за месяц: ${this.expensesMonth}`;

};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth/30);
    return this.budgetMonth;
};

AppData.prototype.getTargetMonth = function() {

    const targetTime = Math.ceil(inputTargetAmount.value/this.getBudget());

    if ( targetTime >= 0 ) {
        return targetTime;
    } else if ( targetTime < 0 ) {
        return `Цель не будет достигнута`;
    } else {
        return `Время достижения цели неопределённое`;
    }
};

AppData.prototype.getStatusIncome = function() {

    let budgetDay = Math.floor(this.getBudget()/30);

    if ( budgetDay >=  1200 ) {
        return ('У вас высокий уровень дохода');
    } else if ( (budgetDay >= 600) && (budgetDay <= 1200) ) {
        return ('У вас средний уровень дохода');
    } else if ( (budgetDay >= 0) && (budgetDay <= 600) ) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }

};

AppData.prototype.getInfoDeposit = function() {

    if (this.deposit) {

        do {
            this.percentDeposit = prompt('Какой годовой процент?');
        }
        while ( !isNumber(this.percentDeposit) );

        do {
            this.moneyDeposit = prompt('Какая сумма заложена?');
        }
        while ( !isNumber(this.moneyDeposit) );

    }

};

AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * selectPeriod.value;
};

AppData.prototype.eventListeners = function() {
    calculateButton.addEventListener('click', this.start.bind(this));
    calculateButton.addEventListener('click', this.isBudgetEmpty);

    resetButton.addEventListener('click', this.reset.bind(this));

    buttonPlusExpenses.addEventListener('click', this.addExpensesBlock);
    buttonPlusIncome.addEventListener('click', this.addIncomeBlock);

    selectPeriod.addEventListener('input', this.changeRange);
};

const appData = new AppData();
appData.eventListeners();