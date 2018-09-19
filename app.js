'use strict';
var hoursOpen = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var storeNames = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
var minCustArray  = [23, 3, 11, 20, 2];
var maxCustArray  = [65, 24, 38, 38, 16];
var avgSaleArray = [6.3, 1.2, 3.7, 2.3, 4.6];

var addStoreForm = document.getElementById('addStoreForm');

var Store = function(storeName, minCust, maxCust, avgSale){
  //hard coded constructor properties
  this.storeName = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  //bases of generated properties
  this.custData = [];
  this.salesData = [];
  this.totalCust = 0;
  this.totalSales = 0;
  Store.locations.push(this);
};

Store.locations = [];
Store.totalCust = 0;
Store.totalSales = 0;

Store.prototype.generateCustomerData = function(){
  let custFloor = this.minCust;
  let custRange = this.maxCust - custFloor + 1;
  return Math.floor((custFloor + ( custRange*Math.random() ) ));
};

Store.prototype.generateSalesData = function(){
  for(var i = 0; i < hoursOpen.length; i++){
    let hourlyCust = this.generateCustomerData();
    this.custData.push(hourlyCust);
    this.totalCust += hourlyCust;
    let hourlySales = Math.floor(hourlyCust*this.avgSale);
    this.salesData.push(hourlySales);
    this.totalSales += hourlySales;
  }
};

function writeTable(targetElementParent, tableId){
  //initial setup of table, thead, tr tags
  var elementParent = targetElementParent;
  var tableNode = document.createElement('table');
  tableNode.id = tableId;
  elementParent.appendChild(tableNode);
  generateHead(tableNode);
  generateBody(tableNode);
  generateFooter(tableNode);
}

function generateHead(targetTable){
  //thead
  let elementParent = targetTable;
  let tableHeaderNode = document.createElement('thead');
  elementParent.appendChild(tableHeaderNode);
  //thead tr
  let tableHeaderRowNode = document.createElement('tr');
  elementParent = tableHeaderNode;
  elementParent.appendChild(tableHeaderRowNode);
  //thead tr th
  elementParent = tableHeaderRowNode;
  writeTableRow(elementParent, '', hoursOpen, 'Total', 'th');
}

function generateBody(targetTable){
  //tbody
  let elementParent = targetTable;
  let tableBodyNode = document.createElement('tbody');
  elementParent.appendChild(tableBodyNode);
  //tbody tr
  var tableBodyRowNode;
  for(var rowNum = 0; rowNum < Store.locations.length; rowNum++){
    tableBodyRowNode = document.createElement('tr');
    elementParent = tableBodyNode;
    elementParent.appendChild(tableBodyRowNode);
    writeTableRow(tableBodyRowNode, Store.locations[rowNum].storeName, Store.locations[rowNum].salesData, Store.locations[rowNum].totalSales, 'td');
  }
}

function generateFooter(targetTable){
  //tfoot
  let tableFooterNode = document.createElement('tfoot');
  let elementParent = targetTable;
  elementParent.appendChild(tableFooterNode);
  //tfoot tr
  let tableFooterRowNode = document.createElement('tr');
  elementParent = tableFooterNode;
  elementParent.appendChild(tableFooterRowNode);
  //tfoot tr td - generate hour totals
  let totalHourlyArray = [];
  let hourAccum = 0;
  let totalDailySales = 0;
  for (var hours = 0; hours < hoursOpen.length; hours++){
    hourAccum = 0;
    for (var openStores = 0; openStores < Store.locations.length; openStores++){
      hourAccum += Store.locations[openStores].salesData[hours];
    }
    totalHourlyArray.push(hourAccum);
    totalDailySales += hourAccum;
  }
  //tfoot tr tf - write the totals
  elementParent = tableFooterRowNode;
  writeTableRow(elementParent, 'Hourly Total', totalHourlyArray, totalDailySales, 'td');
}

function writeTableRow(tableRowTarg, initElement, arrayContent, finElement, rowType){
  //Row can be split into three distinct areas - header column, hourly sales, total sales
  //inital setup and writing the cell in the header column
  let elementRowParent = tableRowTarg;
  let tableCellNode = document.createElement(rowType);
  let tableCellContent = document.createTextNode(initElement);
  tableCellNode.appendChild(tableCellContent);
  elementRowParent.appendChild(tableCellNode);
  //writing to cells in the hourly sales columns
  for(var colNum = 0; colNum < arrayContent.length; colNum++){
    tableCellNode = document.createElement(rowType);
    tableCellContent = document.createTextNode(arrayContent[colNum]);
    tableCellNode.appendChild(tableCellContent);
    elementRowParent.appendChild(tableCellNode);
  }
  //writing to cells in the total sales column
  tableCellNode = document.createElement(rowType);
  tableCellContent = document.createTextNode(finElement);
  tableCellNode.appendChild(tableCellContent);
  elementRowParent.appendChild(tableCellNode);
}

for(var i = 0; i < storeNames.length; i++){
  new Store(storeNames[i], minCustArray[i], maxCustArray[i], avgSaleArray[i]);
  Store.locations[i].generateCustomerData();
  Store.locations[i].generateSalesData();
}

writeTable(document.body, 'salesTable');

var salesTable = document.getElementById('salesTable');
var formIssue = document.getElementById('formIssue');

function addNewStore(event){
  event.preventDefault();
  var newStoreName = event.target.newStoreName.value;
  var newStoreMinCust = event.target.newStoreMinCust.value;
  if(parseFloat(newStoreMinCust) >= 0){ //if minCust can't be parsed it turns into a NaN which is not greater to or equal zero
    newStoreMinCust = parseFloat(newStoreMinCust);
  }
  else{
    formIssue.innerHTML = 'Minimum customers per hour must be a number greater than zero.';
    return false;
  }
  var newStoreMaxCust = event.target.newStoreMaxCust.value;
  if(parseFloat(newStoreMaxCust) >= newStoreMinCust){
    newStoreMaxCust = parseFloat(newStoreMaxCust);
  }
  else{
    formIssue.innerHTML = 'Maximum customers per hour must be a number greater than minimum customers per hour.';
    return false;
  }
  var newStoreAvgSale = event.target.newStoreAvgSale.value;
  if(parseFloat(newStoreAvgSale) >= 0){
    newStoreAvgSale = parseFloat(newStoreAvgSale);
  }
  else{
    formIssue.innerHTML = 'Average sale per customer must be a number greater than zero.';
    return false;
  }
  new Store(newStoreName,newStoreMinCust,newStoreMaxCust,newStoreAvgSale);
  Store.locations[Store.locations.length-1].generateCustomerData();
  Store.locations[Store.locations.length-1].generateSalesData();
  formIssue.innerHTML = '';
  salesTable.parentNode.removeChild(salesTable);
  writeTable(document.body, 'salesTable');
  salesTable = document.getElementById('salesTable');
  event.target.newStoreName.value = '';
  event.target.newStoreMinCust.value = '';
  event.target.newStoreMaxCust.value = '';
  event.target.newStoreAvgSale.value = '';
  return true;
}

addStoreForm.addEventListener('submit', addNewStore);
