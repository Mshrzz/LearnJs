'use strict';

function setCookie(name, value, options = {}) {

    options = {
      path: '',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = (name) + "=" + (value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}



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
      selectDeposit = document.querySelector('.deposit-bank'),
      inputDepositAmount = document.querySelector('.deposit-amount'),
      inputDepositPercent = document.querySelector('.deposit-percent'),
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

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
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

         selectDeposit.disabled = isTrue;
         checkboxDeposit.disabled = isTrue;

         buttonPlusIncome.disabled = isTrue;
         buttonPlusExpenses.disabled = isTrue;
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

        checkboxDeposit.checked = false;
        selectDeposit.style.display = 'none';
        inputDepositAmount.style.display = 'none';
        inputDepositPercent.style.display = 'none';
        selectDeposit.value = '';
        inputDepositAmount.value = '';
    
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();

        let allCookiesFull = document.cookie.split(';');

        let allCookiesName = [];

        for (let oneCookie of allCookiesFull) {
            allCookiesName.push(oneCookie.split('=')[0]);
        }

        for (let cookie of allCookiesName) {
            console.log(`cookie ${cookie} has been deleted, maybe...`);
            deleteCookie(`${cookie}`);
        }

    }

    isBudgetEmpty() {
        while (salaryAmount.value === '') {
            alert('Вы дожны заполнить все обязательные поля!');
            return;
        }
    }

    showResult() {

        setCookie('budgetMonthValue', `${this.budgetMonth}`, {'max-age': 3600});
        setCookie('budgetDayValue', `${this.budgetDay}`, {'max-age': 3600});
        setCookie('expensesMonthValue', `${this.expensesMonth}`, {'max-age': 3600});
        setCookie('additionalExpensesValue', `${this.addExpenses.join(', ')}`, {'max-age': 3600});
        setCookie('additionalIncomeValue', `${this.addExpenses.join(', ')}`, {'max-age': 3600});
        setCookie('targetMonthValue', `${this.getTargetMonth()}`, {'max-age': 3600});
        setCookie('incomePeriodValue', `${this.calcSavedMoney()}`, {'max-age': 3600});
        setCookie('isLoad', `${true}`, {'max-age': 3600});
        console.log(document.cookie);

        //document.cookie = `budgetMonthValue=${this.budgetMonth}`;
        //document.cookie = `budgetDayValue=${this.budgetDay}`;
        //document.cookie = `expensesMonthValue=${this.expensesMonth}`;
        //document.cookie = `additionalExpensesValue=${this.addExpenses.join(', ')}`;
        //document.cookie = `additionalIncomeValue=${this.addIncome.join(', ')}`;
        //document.cookie = `targetMonthValue=${this.getTargetMonth()}`;
        //document.cookie = `incomePeriodValue=${this.calcSavedMoney()}`;
        //document.cookie = `isLoad=${true}`;
        
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        
        const onRangeChange = selectPeriod.addEventListener('input', (function(event){
            incomePeriodValue.value = this.calcSavedMoney();
            document.cookie = `incomePeriodValue=${this.calcSavedMoney()}`;
        }).bind(this));

    }

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');

        if ( expensesItems.length  === 3 ) {
            buttonPlusExpenses.style.display = 'none';
        }
    }

    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
    
        if ( incomeItems.length === 3 ) {
            buttonPlusIncome.style.display = 'none';
        }  
    }

    getExpenses() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
    
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    }

    getIncome() {
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
    }

    getAddExpenses() {
        let addExpenses = inputAdditionalExpenses.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    }

    getAddIncome() {
        inputAdditionalIncome.forEach(function(item) {

            let itemValue = item.value.trim();
    
            if ( itemValue !== '' ) {
                this.addIncome.push(itemValue);
            }
    
        }, this);
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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
            this.percentDeposit = inputDepositPercent.value;
            this.moneyDeposit =  inputDepositAmount.value;
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * selectPeriod.value;
    }

    isDepositPercentNaN() {

        if ( (inputDepositPercent.value < 1) || (inputDepositPercent.value > 100) ) {
            alert('Значение процента возможно только в диапазоне от 1 до 100!');
            inputDepositPercent.value = 0;
        }

    }

    changePercent() {
        console.log(this);
        const valueSelect = this.value;
        if ( valueSelect === 'other' ) {
            inputDepositPercent.value = '';
            inputDepositPercent.style.display = 'inline-block';
            
            inputDepositPercent.addEventListener('input', function(){

                inputDepositPercent.value = inputDepositPercent.value.replace(/(^\d(?=.{3}$))/, '');
                inputDepositPercent.value = inputDepositPercent.value.replace(/[^\d]/, '');

                if (inputDepositPercent.value > 100) {
                    inputDepositPercent.value = 100;
                }

                if (inputDepositPercent.value[0] < 1) {
                    inputDepositPercent.value = 1;
                }

            });

        } else {
            inputDepositPercent.style.display = 'none';
            inputDepositPercent.value = valueSelect;
            
        }
    }

    checkboxChange() {
        this.deposit = checkboxDeposit.checked;
        if ( !this.deposit ) {
            calculateButton.disabled = false;
        }
    }

    depositHandler() {
        if ( checkboxDeposit.checked ) {
            this.deposit = true;
            selectDeposit.style.display = 'inline-block';
            inputDepositAmount.style.display = 'inline-block';

            inputDepositAmount.addEventListener('input', function(){
                inputDepositAmount.value = inputDepositAmount.value.replace(/[^0-9]/, '');
            });

            if ( inputDepositAmount.value === '' ) {
                calculateButton.disabled = true;
                inputDepositAmount.addEventListener('input', function(event){
                    if ( inputDepositAmount.value === '' ) {
                        calculateButton.disabled = true;
                    } else {
                        calculateButton.disabled = false;
                    }
                });
            }

            calculateButton.addEventListener('click', this.isDepositPercentNaN);
            selectDeposit.addEventListener('change', this.changePercent);
        } else {
            selectDeposit.style.display = 'none';
            inputDepositAmount.style.display = 'none';
            selectDeposit.value = '';
            inputDepositAmount.value = '';
            this.deposit = false;
            selectDeposit.removeEventListener('change', this.changePercent);
        }
    }

    addInputsToCookies() {
        let allInputs = document.querySelectorAll('input');
        for (let i = 0; i < allInputs.length; i++) {

            if ( allInputs[i].classList.contains('result-total') ) {
                continue;
            }

            //console.log(`Input #${i} value = ${allInputs[i].value}`);
            //document.cookie = `input${i}Value=${allInputs[i].value}`;
            setCookie(`input${i}Value`, `${allInputs[i].value}`, {'max-age': 3600});

        }
    }

    eventListeners() {
        calculateButton.addEventListener('click', this.start.bind(this));
        calculateButton.addEventListener('click', this.isBudgetEmpty);
        calculateButton.addEventListener('click', this.addInputsToCookies);

        resetButton.addEventListener('click', this.reset.bind(this));
    
        buttonPlusExpenses.addEventListener('click', this.addExpensesBlock);
        buttonPlusIncome.addEventListener('click', this.addIncomeBlock);
    
        selectPeriod.addEventListener('input', this.changeRange);

        checkboxDeposit.addEventListener('change', this.depositHandler.bind(this));
        checkboxDeposit.addEventListener('change', this.checkboxChange);

        document.addEventListener('DOMContentLoaded', (function(){
            if ( document.cookie.length > 0 ) {

                let allInputs = document.querySelectorAll('input');

                for (let i = 0; i < allInputs.length; i++ ) {

                    if ( allInputs[i].classList.contains('result-total') ) {
                        continue;
                    }

                    allInputs[i].value = getCookie(`input${i}Value`);
                }

                this.block(true);

                // Записываем в куки результаты
                budgetMonthValue.value = getCookie('budgetMonthValue');
                budgetDayValue.value = getCookie('budgetDayValue');
                expensesMonthValue.value = getCookie('expensesMonthValue');
                additionalExpensesValue.value = getCookie('additionalExpensesValue');
                additionalIncomeValue.value = getCookie('additionalIncomeValue');
                targetMonthValue.value = getCookie('targetMonthValue');
                incomePeriodValue.value = getCookie('incomePeriodValue');

            }
        }).bind(this));


    }
}

const appData = new AppData();
appData.eventListeners();