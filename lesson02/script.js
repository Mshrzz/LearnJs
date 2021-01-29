const money = 50000, 
      income = 'freelance', 
      addExpenses = 'Internet, Taxi, Communal payments, Food', 
      deposit = true, 
      mission = 500000, 
      period = 12;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев\nЦель заработать ${mission} рублей`);

const addExpensesLower = addExpenses.toLowerCase();
console.log(addExpensesLower.split(', '));

const budgetDay = money/30;
console.log(budgetDay);