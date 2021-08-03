'use strict';

let money = Number(prompt('Ваш месячный доход?'));

let income = 'фриланс';

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let deposit = confirm('Есть ли у вас депозит в банке?');

let mission = 1e6;

let period = 6;

// вызовы функции showTypeOf
console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

// Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpenses.toLowerCase().split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = Number(prompt('Во сколько это обойдется?'));

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = Number(prompt('Во сколько это обойдется?'));

// Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(amount1, amount2){
  return amount1 + amount2;
}

// Расходы за месяц вызов getExpensesMonth
console.log('Расходы за месяц:', getExpensesMonth(amount1, amount2));

// Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth (income, expenses){
  return income - expenses;
}

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная
// результат месячного накопления (accumulatedMonth) и возвращает результат
function getTargetMonth(mission, accumulatedMonth){
  return Math.ceil(mission / accumulatedMonth);
}

// Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
console.log(`Цель будет достигнута за ${getTargetMonth(mission, accumulatedMonth)} месяцев(-а)`);

// budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
let budgetDay = Math.floor(accumulatedMonth / 30);

// Бюджет на день (budgetDay)
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

// вызов функции getStatusIncome
console.log(getStatusIncome());
