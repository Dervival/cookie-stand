var hoursOpen = ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM'];
var storeNames = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
var pikeStore = {
  storeName: storeNames[0],
  minCust: 23,
  maxCust: 65,
  avgCust: 6.3,
  salesData: [],
  totalSales: 0,
  generateSalesData: function() {
    console.log('Generating sales data for ' + this.storeName);
    for(var i = 0; i < hoursOpen.length; i++){
      let custFloor = this.minCust;
      let custRange = this.maxCust - custFloor;
      let hourlySales = (custFloor + Math.floor( custRange*Math.random()) );
      console.log(hourlySales);
      this.salesData.push(hourlySales);
    }
  }
};

pikeStore.generateSalesData();
console.log(pikeStore);
