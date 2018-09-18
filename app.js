'use strict';
var hoursOpen = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var storeNames = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
var minCustArray  = [23, 3, 11, 20, 2];
var maxCustArray  = [65, 24, 38, 38, 16];
var avgSaleArray = [6.3, 1.2, 3.7, 2.3, 4.6];

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
  let custRange = this.maxCust - custFloor + 1; //previous off by one error - was non-inclusive of max
  return Math.floor((custFloor + ( custRange*Math.random() ) ));
};

Store.prototype.generateSalesData = function(){
  console.log(`Generating sales data for ${this.storeName}`);
  //let debugAccum = 0;
  for(var i = 0; i < hoursOpen.length; i++){
    let hourlyCust = this.generateCustomerData();
    this.custData.push(hourlyCust);
    this.totalCust += hourlyCust;
    let hourlySales = Math.floor(hourlyCust*this.avgSale);
    this.salesData.push(hourlySales);
    this.totalSales += hourlySales;
  }
};

Store.prototype.writeToPage = function(){
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
};

function appendUlElement(hour, cookies, nodeHead){
  let unordListEl = document.createElement('li');
  let unordListElText = `${hour}: ${cookies} cookies`;
  unordListEl.appendChild(document.createTextNode(unordListElText));
  nodeHead.appendChild(unordListEl);
}

var pikeStore = new Store(storeNames[0],minCustArray[0],maxCustArray[0],avgSaleArray[0]);
var seatacStore = new Store(storeNames[1],minCustArray[1],maxCustArray[1],avgSaleArray[1]);
var seatCentStore = new Store(storeNames[2],minCustArray[2],maxCustArray[2],avgSaleArray[2]);
var capHillStore = new Store(storeNames[3],minCustArray[3],maxCustArray[3],avgSaleArray[3]);
var alkiStore = new Store(storeNames[4],minCustArray[4],maxCustArray[4],avgSaleArray[4]);
for(var i = 0; i < Store.locations.length; i++){
  Store.locations[i].generateCustomerData();
  Store.locations[i].generateSalesData();
  Store.locations[i].writeToPage();
}
console.log(pikeStore);
console.log(seatacStore);
console.log(seatCentStore);
console.log(capHillStore);
console.log(alkiStore);
