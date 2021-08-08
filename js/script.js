'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
   if (n === null) {
     return false;
   } else if (/\D/.test(n)) {
     return true;
   } else {
     return false;
   }
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1e6,
  period: 3,
  asking: function(){
    if(confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
        do {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Пишу картины');
        }while (!isString(itemIncome));

      let cashIncome;
        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 9999);
        }while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses;
      do {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      } while(!isString(addExpenses));
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0;
        for (let i = 0; i < 2; i++){
          let userInput;
          let expenseItem;
            do {
              expenseItem = prompt('Введите обязательную статью расходов?');
            } while (!isString(expenseItem));
            do {
              userInput = prompt('Во сколько это обойдется?');
            } while (!isNumber(userInput));
            appData.expenses[expenseItem] = +userInput;
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
  },
  getInfoDeposit: function(){
    let percentDeposit, moneyDeposit;
    if(appData.deposit){
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while(!isNumber(percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while(!isNumber(moneyDeposit));
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
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

console.log(appData.addExpenses.map(item =>
  item.replace(item.charAt(0), item.charAt(0).toUpperCase())).join(', '));
