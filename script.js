'use strict';

function showTypeOf(type){
    return typeof(type);
}

function getExpensesMonth(expenseMonth1, expenseMonth2) {
    if ( !expenseMonth1 ) {
        expenseMonth1 = 0;
    } else if ( !expenseMonth2 ) {
        expenseMonth2 = 0;
    }
    return expenseMonth1 + expenseMonth2;
}

function getAccumulatedMonth(incomeMonth, getExpensesMonth) {
    return incomeMonth - getExpensesMonth;
}

function getTargetMonth(accumulatesInMonth, target) {
    return Math.ceil(target/accumulatesInMonth);
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

const money = parseInt(prompt('Ваш месячный доход?')),
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      expenses1 = prompt('Введите обязательную статью расходов?'),
      amount1 = parseInt(prompt('Во сколько это обойдется?')),
      expenses2 = prompt('Введите обязательную статью расходов?'),
      amount2 = parseInt(prompt('Во сколько это обойдется?')),
      budgetDay = money/30,
      income = 'freelance', 
      mission = 500000, 
      period = 12;

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

console.log(showTypeOf(money), ' ', showTypeOf(income), ' ', showTypeOf(deposit));

console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));

console.log(addExpenses.toLowerCase().split(', '));

console.log('Срок достижения цели: ', 
            getTargetMonth(accumulatedMonth, mission), 
            ' месяцев');

console.log(`Ваш бюджет на день с учетом обязательных расходов: ${Math.floor(accumulatedMonth/30)}`);

console.log(getStatusIncome(budgetDay));