'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (n) {
  if (n === null) {
    return false;
  } else if (/\D/.test(n)) {
    return true;
  } else {
    return false;
  }
};

let money,
  start = function () {
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
  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Пишу картины');
      } while (!isString(itemIncome));

      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 9999);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    } while (!isString(addExpenses));
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let sum = 0;
    for (let i = 0; i < 2; i++) {
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
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    return sum;
  },
  getTargetMonth: function () {
    let monthForTarget = Math.ceil(appData.mission / (money - appData.expensesMonth));
    if (monthForTarget > 0) {
      return `Цель будет достигнута за ${monthForTarget} месяцев(-а)`;
    } else {
      return 'Цель не будет достигнута';
    }
  },
  getBudget: function () {
    appData.budgetMonth = money - appData.getExpensesMonth();

    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getStatusIncome: function () {
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
  getInfoDeposit: function () {
    let percentDeposit, moneyDeposit;
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(moneyDeposit));
    }
  },
  calcSavedMoney: function () {
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

//получить каждый элемент в отдельную переменную:
// Кнопку "Рассчитать" через id
let calculate = document.getElementById('start');

// Кнопки “+” (плюс) через Tag, каждую в своей переменной.
let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];

let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

// Чекбокс по id через querySelector
let depositCheckmark = document.querySelector('#deposit-check');

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
let budgetDayValue = document.getElementsByClassName('budget_day-value');
let expensesMonthValue = document.getElementsByClassName('expenses_month-value');
let additionalIncomeValue = document.getElementsByClassName('additional_income-value');
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
let incomePeriodValue = document.getElementsByClassName('income_period-value');
let targetMonthValue = document.getElementsByClassName('target_month-value');

// Оставшиеся поля через querySelector каждый в отдельную переменную:
let budgetMonthValue = document.querySelector('.budget_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');

// поля ввода (input) с левой стороны и не забудьте про range.
let periodSelect = document.querySelector('.period-select');
