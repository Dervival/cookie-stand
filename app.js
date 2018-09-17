'use strict';
var hoursOpen = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var storeNames = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

var pikeStore = {
  //Hardcoded properties
  storeName: storeNames[0],
  minCust: 23,
  maxCust: 65,
  avgSale: 6.3,
  //Generated properties
  salesData: [],
  totalSales: 0,
  //Methods
  generateSales: generateSalesData,
  writeData: writeToPage
};

var seatacStore = {
  storeName: storeNames[1],
  minCust: 3,
  maxCust: 24,
  avgSale: 1.2,
  salesData: [],
  totalSales: 0,
  generateSales: generateSalesData,
  writeData: writeToPage
};

var seatCentStore = {
  storeName: storeNames[2],
  minCust: 11,
  maxCust: 38,
  avgSale: 3.7,
  salesData: [],
  totalSales: 0,
  generateSales: generateSalesData,
  writeData: writeToPage
};

var capHillStore = {
  storeName: storeNames[3],
  minCust: 20,
  maxCust: 38,
  avgSale: 2.3,
  salesData: [],
  totalSales: 0,
  generateSales: generateSalesData,
  writeData: writeToPage
};

var alkiStore = {
  storeName: storeNames[4],
  minCust: 2,
  maxCust: 16,
  avgSale: 4.6,
  salesData: [],
  totalSales: 0,
  generateSales: generateSalesData,
  writeData: writeToPage
};

function generateSalesData() {
  console.log(`Generating sales data for ${this.storeName}`);
  //let debugAccum = 0;
  for(var i = 0; i < hoursOpen.length; i++){
    let custFloor = this.minCust;
    let custRange = this.maxCust - custFloor;
    let hourlySales = Math.floor((custFloor + ( custRange*Math.random() ) )*this.avgSale);
    console.log(`Sales for ${hoursOpen[i]}: ${hourlySales}`);
    this.salesData.push(hourlySales);
    //debugAccum += hourlySales;
  }
  //console.log(debugAccum + ' sales for the day');
}

function generateTotalSales(salesArray) {
  let salesAccum = 0;
  for(var i = 0; i < salesArray.length; i++){
    salesAccum += salesArray[i];
  }
  return salesAccum;
}

function writeToPage(){
  var headerNode = document.createElement('p');
  headerNode.id = this.storeName;
  var headerText = document.createTextNode(this.storeName);
  headerNode.appendChild(headerText);
  document.body.appendChild(headerNode);
  var unordListNode = document.createElement('ul');
  document.body.appendChild(unordListNode);
  for(var i = 0; i < this.salesData.length; i++){
    appendUlElement(hoursOpen[i], this.salesData[i], unordListNode);
  }
  appendUlElement('Total', this.totalSales, unordListNode);
}
function appendUlElement(hour, cookies, nodeHead){
  let unordListEl = document.createElement('li');
  let unordListElText = `${hour}: ${cookies} cookies`;
  unordListEl.appendChild(document.createTextNode(unordListElText));
  nodeHead.appendChild(unordListEl);
}

pikeStore.generateSales();
pikeStore.totalSales = generateTotalSales(pikeStore.salesData);
pikeStore.writeData();

seatacStore.generateSales();
seatacStore.totalSales = generateTotalSales(seatacStore.salesData);
seatacStore.writeData();

seatCentStore.generateSales();
seatCentStore.totalSales = generateTotalSales(seatCentStore.salesData);
seatCentStore.writeData();

capHillStore.generateSales();
capHillStore.totalSales = generateTotalSales(capHillStore.salesData);
capHillStore.writeData();

alkiStore.generateSales();
alkiStore.totalSales = generateTotalSales(alkiStore.salesData);
alkiStore.writeData();
