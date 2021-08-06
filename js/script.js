'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      } while (!isNumber(money));
        money = +money;
    };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1e6,
  period: 3,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function(){
    let sum = 0;
      for (let i = 0; i < 2; i++){
      appData.expenses[i] = prompt('Введите обязательную статью расходов?');
      let userInput;
      do {
        userInput = prompt('Во сколько это обойдется?');
      } while (!isNumber(userInput));
      sum += +userInput;
    }
    console.log(appData.expenses);
    return sum;
  },
  getAccumulatedMonth: function(income, expenses){
    return income - expenses;
  },
  getTargetMonth: function(mission, accumulatedMonth){
    let monthForTarget = Math.ceil(mission / accumulatedMonth);
    if (monthForTarget > 0) {
      return `Цель будет достигнута за ${monthForTarget} месяцев(-а)`;
    } else {
      return 'Цель не будет достигнута';
    }
  },
  getStatusIncome: function(){
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас cредний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  }
};

let expensesAmount = appData.getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmount);

let accumulatedMonth = appData.getAccumulatedMonth(money, expensesAmount);
console.log(appData.getTargetMonth(appData.mission, accumulatedMonth));

appData.budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день:', appData.budgetDay);

console.log(appData.getStatusIncome());
