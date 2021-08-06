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
        let sum = 0;
        for (let i = 0; i < 2; i++){
          let userInput;
          let a = prompt('Введите обязательную статью расходов?');
            do {
              userInput = prompt('Во сколько это обойдется?');
            } while (!isNumber(userInput));
            appData.expenses[a] = +userInput;
            sum += +userInput;
          }
          return sum;
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function(){
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    return sum;
  },
  getTargetMonth: function(){
    let monthForTarget = Math.ceil(appData.mission / (money - appData.expensesMonth));
    if (monthForTarget > 0) {
      return `Цель будет достигнута за ${monthForTarget} месяцев(-а)`;
    } else {
      return 'Цель не будет достигнута';
    }
  },
  getBudget: function(){
    appData.budgetMonth = money - appData.getExpensesMonth();

    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
appData.asking();
appData.getBudget();

console.log('Расходы за месяц:', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя:');
for (let key in appData) {
  console.log(`${key}: ${appData[key]}`);
}
