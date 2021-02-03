'use strict';

const money = parseInt(prompt('Ваш месячный доход?')),
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      expenses1 = prompt('Введите обязательную статью расходов?'),
      amount1 = parseInt(prompt('Во сколько это обойдется?')),
      expenses2 = prompt('Введите обязательную статью расходов?'),
      amount2 = parseInt(prompt('Во сколько это обойдется?')),
      budgetMonth = money - amount1,
      budgetDay = money/30,
      income = 'freelance', 
      mission = 500000, 
      period = 12;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев\nЦель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase());
console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на день без учета обязательных расходов: ', budgetDay);

console.log(`По нашим расчетам ваша цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев`);
console.log(`Ваш бюджет на день с учетом обязательных расходов: ${Math.floor(budgetMonth/30)}`);

if ( budgetDay >=  1200 ) {
    console.log('У вас высокий уровень дохода');
} else if ( (budgetDay >= 600) && (budgetDay <= 1200) ) {
    console.log('У вас средний уровень дохода');
} else if ( (budgetDay >= 0) && (budgetDay <= 600) ) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
    console.log('Что-то пошло не так');
}