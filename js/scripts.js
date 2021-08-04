'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1e6,
    period = 6;

// Переписать функцию start циклом do while
let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  money = +money;
};

start();

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.toLowerCase().split(', '));

let expenses = [];

let getExpensesMonth = function(){
  let sum = 0;

  for (let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов?');
// Добавить проверку что введённые данные являются числом, которые мы получаем на вопрос
// 'Во сколько это обойдется?’ в функции  getExpensesMonth
    let userInput;
    do {
      userInput = prompt('Во сколько это обойдется?');
    } while (!isNumber(userInput));
    sum += +userInput;
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

function getAccumulatedMonth (income, expenses){
  return income - expenses;
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

// Если getTargetMonth возвращает нам отрицательное значение,
// то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”

function getTargetMonth(mission, accumulatedMonth){
  let monthForTarget = Math.ceil(mission / accumulatedMonth);
  if (monthForTarget > 0) {
    return `Цель будет достигнута за ${monthForTarget} месяцев(-а)`;
  } else {
    return 'Цель не будет достигнута';
  }
}

console.log(getTargetMonth(mission, accumulatedMonth));

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на день:', budgetDay);

let getStatusIncome = function(){
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас cредний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};

console.log(getStatusIncome());
