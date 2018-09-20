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
  this.laborData = [];
  this.salesData = [];
  this.totalLabor = 0;
  this.totalSales = 0;
  Store.locations.push(this);
};

Store.locations = [];
Store.totalLabor = 0;
Store.totalSales = 0;

Store.prototype.generateCustomerData = function(){
  let custFloor = this.minCust;
  let custRange = this.maxCust - custFloor + 1;
  return Math.floor((custFloor + ( custRange*Math.random() ) ));
};

Store.prototype.generateSalesData = function(){
  for(var i = 0; i < hoursOpen.length; i++){
    let hourlyCust = this.generateCustomerData();
    console.log('Customers generated: ' + hourlyCust);
    let hourlyLabor = Math.max(2, Math.floor(hourlyCust/20 + 1));
    console.log('Labor needed: ' + hourlyLabor);
    this.laborData.push(hourlyLabor);
    this.totalLabor += hourlyLabor;
    let hourlySales = Math.floor(hourlyCust*this.avgSale);
    console.log('Cookies sold: ' + hourlySales);
    this.salesData.push(hourlySales);
    this.totalSales += hourlySales;
  }
};

function writeTable(targetElementParent, tableId, type){
  //initial setup of table, thead, tr tags
  var elementParent = targetElementParent;
  //var tableNodeName = document.createElement('h2');
  //tableNodeName.id = type;
  //elementParent.appendChild(tableNodeName);
  //addElement('h2',type,targetElementParent);
  var tableNode = document.createElement('table');
  tableNode.id = tableId;
  elementParent.appendChild(tableNode);
  generateHead(tableNode, type);
  generateBody(tableNode, type);
  generateFooter(tableNode, type);
}

function generateHead(targetTable, tableType){
  //thead
  let addedElement = addElement('thead', '', targetTable);
  //thead tr
  addedElement = addElement('tr','',addedElement);
  //thead tr th
  var tableTitle;
  switch(tableType){
  case 'sales':
    tableTitle = 'Sales';
    break;
  case 'labor':
    tableTitle = 'Labor';
    break;
  default:
    tableTitle = '';
    break;
  }
  writeTableRow(addedElement, tableTitle, hoursOpen, 'Total', 'th');
}

function generateBody(targetTable, tableType){
  //tbody
  let childElement = addElement('tbody','',targetTable);
  //tbody tr
  var rowNum = 0;
  switch (tableType){
  case 'sales':
    for(rowNum = 0; rowNum < Store.locations.length; rowNum++){
      let grandChildElement = addElement('tr','',childElement);
      writeTableRow(grandChildElement, Store.locations[rowNum].storeName, Store.locations[rowNum].salesData, Store.locations[rowNum].totalSales, 'td');
    }
    break;
  case 'labor':
    for(rowNum = 0; rowNum < Store.locations.length; rowNum++){
      let grandChildElement = addElement('tr','',childElement);
      writeTableRow(grandChildElement, Store.locations[rowNum].storeName, Store.locations[rowNum].laborData, Store.locations[rowNum].totalLabor, 'td');
    }
    break;
  default:
    for(rowNum = 0; rowNum < Store.locations.length; rowNum++){
      let grandChildElement = addElement('tr','',childElement);
      writeTableRow(grandChildElement, Store.locations[rowNum].storeName, Store.locations[rowNum].salesData, Store.locations[rowNum].totalSales, 'td');
    }
    break;
  }
}

function generateFooter(targetTable, tableType){
  //tfoot
  let addedElement = addElement('tfoot','',targetTable);
  //tfoot tr
  addedElement = addElement('tr','',addedElement);
  //tfoot tr td - generate hour totals
  let totalHourlyArray = [];
  let hourAccum = 0;
  let totalDaily = 0;
  for (var hours = 0; hours < hoursOpen.length; hours++){
    hourAccum = 0;
    for (var openStores = 0; openStores < Store.locations.length; openStores++){
      switch (tableType){
      case 'sales':
        hourAccum += Store.locations[openStores].salesData[hours];
        break;
      case 'labor':
        hourAccum += Store.locations[openStores].laborData[hours];
        break;
      default:
        hourAccum += Store.locations[openStores].salesData[hours];
        break;
      }
    }
    totalHourlyArray.push(hourAccum);
    totalDaily += hourAccum;
  }
  //tfoot tr td - write the totals
  writeTableRow(addedElement, 'Hourly Total', totalHourlyArray, totalDaily, 'td');
}

function writeTableRow(tableRowTarg, initElement, arrayContent, finElement, rowType){
  //Row can be split into three distinct areas - header column, hourly sales, total sales
  //inital setup and writing the cell in the header column
  addElement(rowType,initElement,tableRowTarg);
  //writing to cells in the hourly sales columns
  for(var colNum = 0; colNum < arrayContent.length; colNum++){
    addElement(rowType,arrayContent[colNum],tableRowTarg);
  }
  //writing to cells in the total sales column
  addElement(rowType,finElement,tableRowTarg);
}

function addElement(tag,elementContent,parentElement){
  let newElement = document.createElement(tag);
  if(elementContent){
    let newElementContent = document.createTextNode(elementContent);
    newElement.appendChild(newElementContent);
  }
  parentElement.appendChild(newElement);
  return(newElement);
}

for(var i = 0; i < storeNames.length; i++){
  new Store(storeNames[i], minCustArray[i], maxCustArray[i], avgSaleArray[i]);
  Store.locations[i].generateCustomerData();
  Store.locations[i].generateSalesData();
}

var tableLocation = document.getElementById('tableLocation');
writeTable(tableLocation, 'salesTable', 'sales');
writeTable(tableLocation, 'laborTable', 'labor');

//var salesTableHeader = document.getElementById('sales');
var salesTable = document.getElementById('salesTable');

//var laborTableHeader = document.getElementById('labor');
var laborTable = document.getElementById('laborTable');

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

  //salesTableHeader.parentNode.removeChild(salesTableHeader);
  salesTable.parentNode.removeChild(salesTable);
  writeTable(tableLocation, 'salesTable', 'sales');
  //salesTableHeader = document.getElementById('sales');
  salesTable = document.getElementById('salesTable');

  //laborTableHeader.parentNode.removeChild(laborTableHeader);
  laborTable.parentNode.removeChild(laborTable);
  writeTable(tableLocation, 'laborTable', 'labor');
  //laborTableHeader = document.getElementById('labor');
  laborTable = document.getElementById('laborTable');

  event.target.newStoreName.value = '';
  event.target.newStoreMinCust.value = '';
  event.target.newStoreMaxCust.value = '';
  event.target.newStoreAvgSale.value = '';
  return true;
}

addStoreForm.addEventListener('submit', addNewStore);
