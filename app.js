var hoursOpen = ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM'];
var storeNames = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
var pikeStore = {
  storeName: storeNames[0],
  minCust: 23,
  maxCust: 65,
  avgCust: 6.3,
  salesData: [],
  totalSales: 0,
  generateSales: generateSalesData,
  writeData: writeToPage
};

function generateSalesData() {
  console.log('Generating sales data for ' + this.storeName);
  //let debugAccum = 0;
  for(var i = 0; i < hoursOpen.length; i++){
    let custFloor = this.minCust;
    let custRange = this.maxCust - custFloor;
    let hourlySales = (custFloor + Math.floor( custRange*Math.random()) );
    console.log(hourlySales);
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
  //document.body.insertAdjacentElement('beforeend',headerNode);
  document.body.appendChild(headerNode);
  var unordListNode = document.createElement('ul');
  //document.body.headerNode.appendChild(unordListNode);
  document.body.appendChild(unordListNode);
  //var unordListEl;
  //var unordListElText;
  for(var i = 0; i < this.salesData.length; i++){
    appendUlElement(hoursOpen[i], this.salesData[i], unordListNode);
    //unordListEl = document.createElement('li');
    //unordListElText = hoursOpen[i] + ': ' + this.salesData[i] + ' cookies';
    //unordListEl.appendChild(document.createTextNode(unordListElText));
    //unordListNode.appendChild(unordListEl);
  }
  //unordListEl = document.createElement('li');
  //unordListElText = 'Total: ' + this.totalSales + ' cookies';
  appendUlElement('Total', this.totalSales, unordListNode);
}
function appendUlElement(hour, cookies, nodeHead){
  let unordListEl = document.createElement('li');
  let unordListElText = hour + ': ' + cookies + ' cookies';
  unordListEl.appendChild(document.createTextNode(unordListElText));
  nodeHead.appendChild(unordListEl);
}
pikeStore.generateSales();
pikeStore.totalSales = generateTotalSales(pikeStore.salesData);
pikeStore.writeData();

// var testElement = document.createElement('h1');
// var testElementContent = document.createTextNode(pikeStore.storeName);
// testElement.appendChild(testElementContent);
// document.body.insertAdjacentElement('afterend',testElement);

//console.log(pikeStore);
