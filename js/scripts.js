let money = 50000;

let income = 'фриланс'; 

let addExpenses = 'Интернет, такси, коммуналка'; 

let deposit = true;

let mission = 1000000;

let period = 6;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
console.log(budgetDay);
