'use strict';

let start = document.getElementById('start'),
    reset = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_income-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.getElementsByClassName('income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesTitle = document.getElementsByClassName('expenses-title')[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.getElementsByClassName('period-select')[0],
    periodAmount = document.getElementsByClassName('period-amount')[0],
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    inputs = document.querySelectorAll('input');

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

const AppData = function () {
  this.budgetDay= 0,
  this.budgetMonth= 0,
  this.budget= 0,
  this.expensesMonth= 0,
  this.income= {},
  this.incomeMonth= 0,
  this.addIncome= [],
  this.expenses= {},
  this.addExpenses= [],
  this.deposit= false,
  this.percentDeposit= 0,
  this.moneyDeposit= 0;

};

AppData.prototype.start = function() {
  this.inputsToggle(true);
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getAmountMonth();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.btnDisable();
};

AppData.prototype.reset = function() {
  this.setNul();
  this.btnEnable();
};

AppData.prototype.btnDisable = function(){
  start.style.display = 'none';
  reset.style.display = 'block';
};

AppData.prototype.btnEnable = function(){
  start.style.display = 'block';
  reset.style.display = 'none';
};

AppData.prototype.setNul = function(){
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses =[];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

  this.inputsToggle(false);
  this.removeBlock('.expenses-items');
  this.removeBlock('.income-items');
  this.clearInputs(inputs);

  periodSelect.value = 0;
  periodAmount.textContent = 0;
};

AppData.prototype.showResult = function(){
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  periodSelect.addEventListener('input', this.changeIncomePeriodValue);
  incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.clearInputs = function(inputs){
  inputs.forEach(function(item){
    item.value = '';
  });
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function(){
  let cloneIncomeItem = incomeItem[0].cloneNode(true);
  incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItem = document.querySelectorAll('.income-items');
  if(incomeItem.length === 3){
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.removeBlock = function (block) {
  let items = document.querySelectorAll(block);
  items.forEach(function(item, index){
    if (index > 0) {
      item.remove();
    }
  if (block === '.expenses-items') {
    expensesPlus.style.display = 'block';
  } else if (block === '.income-items') {
    incomePlus.style.display = 'block';
  }
  });
};

AppData.prototype.getAddIncome = function(){
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== ''){
      this.addIncome.push(itemValue);
    }
  }, this);
};

AppData.prototype.getExpenses = function(){
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = +item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this);
};

AppData.prototype.getIncome = function(){
  incomeItem.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = +item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== ''){
      this.income[itemIncome] = cashIncome;
    }
  }, this);
};

AppData.prototype.getAmountMonth = function (){
  let sum = 0;
  for (let key in this.income) {
    sum += this.income[key];
  }
  this.incomeMonth = sum;
  return sum;
};

AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== ''){
      this.addExpenses.push(item);
    }
  }, this);
};

AppData.prototype.getExpensesMonth = function () {
  let sum = 0;
  for (let key in this.expenses) {
    sum += this.expenses[key];
  }
  this.expensesMonth = sum;
  return sum;
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

// getStatusIncome: function () {
//   if (appData.budgetDay >= 1200) {
//     return ('У вас высокий уровень дохода');
//   } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//     return ('У вас cредний уровень дохода');
//   } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
//     return ('К сожалению у вас уровень дохода ниже среднего');
//   } else {
//     return ('Что-то пошло не так');
//   }
// },
// getInfoDeposit: function () {
//   let percentDeposit, moneyDeposit;
//   if (appData.deposit) {
//     do {
//       appData.percentDeposit = prompt('Какой годовой процент?', 10);
//     } while (!isNumber(percentDeposit));
//     do {
//       appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//     } while (!isNumber(moneyDeposit));
//   }
// },
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changeRange = function(){
  document.querySelector('.period-amount').textContent = periodSelect.value;
};

AppData.prototype.checkEmpty = function(){
  if (salaryAmount.value === '') {
    start.disabled = true;
  } else {
    start.disabled = false;
  }
};

AppData.prototype.inputsToggle = function (tap) {
  let inputs = document.querySelectorAll('input');
  if (tap === true) {
    inputs.forEach(function(item){
      item.disabled = true;
    });
  }
  if (tap === false) {
    inputs.forEach(function(item){
      item.disabled = false;
    });
  }
};


AppData.prototype.eventListeners = function () {
  salaryAmount.addEventListener('input', this.checkEmpty.bind(this));
  start.addEventListener('mouseover', this.checkEmpty.bind(this));
  start.addEventListener('click', this.start.bind(this));
  reset.addEventListener('click', this.reset.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  periodSelect.addEventListener('input', this.changeRange.bind(this));
};

const appData = new AppData();

appData.eventListeners();
