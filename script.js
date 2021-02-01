'use strict';

const income = 'freelance', 
      mission = 500000, 
      period = 12;

let money = 50000,
    addExpenses = 'Internet, Taxi, Communal payments, Food',
    deposit = true,
    expenses1,
    expenses2,
    amount1,
    amount2,
    budgetMonth,
    budgetDay = money/30;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев\nЦель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на день: ', budgetDay);

// ВАЖНО: пользователь может ввести 500000руб - поэтому +prompt() не поможет

money = parseInt(prompt('Ваш месячный доход?'));
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов?');
expenses2 = prompt('Введите обязательную статью расходов?');

amount1 = parseInt(prompt('Во сколько это обойдется?'));
amount2 = parseInt(prompt('Во сколько это обойдется?'));

budgetMonth = money - amount1; // Хотел бы сделать вообще так: money - Math.max(amount1, amount2)

console.log(`По нашим расчетам ваша цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев`);
console.log(`Ваш бюджет на день: ${Math.floor(budgetMonth/30)}`);

if ( budgetDay >=  1200 ) {
    console.log('У вас высокий уровень дохода');
} else if ( (budgetDay >= 600) && (budgetDay <= 1200) ) {
    console.log('У вас средний уровень дохода');
} else if ( (budgetDay >= 0) && (budgetDay <= 600) ) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
    console.log('Что-то пошло не так');
}