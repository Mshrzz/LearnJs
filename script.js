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
      inputAdditionalExpenses = document.querySelectorAll('.additional_expenses-item'),
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


class AppData {

    constructor() {
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

    start() {
        let money = 0;

        this.budget = +salaryAmount.value;
        console.log(salaryAmount.value);

        this.getExpInc();
        this.getBudget();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.showResult();
        this.block(true);
    }

    block(isTrue) {
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
    }

    reset() {
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
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getBudget();
        this.showResult();
    }

    isBudgetEmpty() {
        while (salaryAmount.value === '') {
            alert('Вы дожны заполнить все обязательные поля!');
            return;
        }
    }

    showResult() {
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
    }

    addExpInc(event) {

        const add = (startString, button) => {
            let typeItem = document.querySelectorAll(`.${startString}-items`);
            const cloneItem = typeItem[0].cloneNode(true);

            typeItem[0].parentNode.insertBefore(cloneItem, button);
            typeItem = document.querySelectorAll(`.${startString}-items`);

            if ( typeItem.length === 3 ) {
                button.style.display = 'none';
            }
        };

        const startStr = event.target.parentElement.className;
        add(startStr, event.target);

    }

    getExpInc() {

        const count = item => {
            console.log(item);
            const startStr = item.className.split('-')[0];

            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };


        incomeItems.forEach(count);

        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }

    }

    getAddExpInc() {

        const count = item => {

            let current = (item.className === 'additional_expenses-item') ?
                           'addExpenses' : 'addIncome';

            let itemValue = item.value.trim();

            let condition = (item.className === 'additional_expenses-item') ? 
            item.value.split(', ') : false;

            if ( itemValue !== '' ) {
                this[current].push(itemValue);
            }
        };

        inputAdditionalIncome.forEach(count, this);
        inputAdditionalExpenses.forEach(count, this);
    }

    changeRange(event) {
        let rangeIndicator = document.querySelector('.period-amount');
        rangeIndicator.textContent = event.target.value;
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    
        return `Ваши расходы за месяц: ${this.expensesMonth}`;
    
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
        return this.budgetMonth;
    }

    getTargetMonth() {
        const targetTime = Math.ceil(inputTargetAmount.value/this.getBudget());

        if ( targetTime >= 0 ) {
            return targetTime;
        } else if ( targetTime < 0 ) {
            return `Цель не будет достигнута`;
        } else {
            return `Время достижения цели неопределённое`;
        }
    }

    getStatusIncome() {
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
    }

    getInfoDeposit() {
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
    }

    calcSavedMoney() {
        return this.budgetMonth * selectPeriod.value;
    }

    eventListeners() {
        calculateButton.addEventListener('click', this.start.bind(this));
        calculateButton.addEventListener('click', this.isBudgetEmpty);
    
        resetButton.addEventListener('click', this.reset.bind(this));
    
        buttonPlusExpenses.addEventListener('click', this.addExpInc);
        buttonPlusIncome.addEventListener('click', this.addExpInc);
    
        selectPeriod.addEventListener('input', this.changeRange);
    }
}

const appData = new AppData();
appData.eventListeners();