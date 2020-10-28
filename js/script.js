import AreaChart from './AreaChart.js';
import StackedAreaChart from './StackedAreaChart.js';



d3.csv('data/unemployment.csv',d3.autoType).then(data=>{
    
    let total
    data.forEach(element => {
      //need to find all the sums
      total=element["Agriculture"]+element["Wholesale and Retail Trade"]+element["Manufacturing"]+element["Leisure and hospitality"]+element["Business services"]+element["Construction"]+element["Education and Health"]+element["Government"]+element["Finance"]+element["Self-employed"]+element["Other"]+element["Transportation and Utilities"]+element["Information"]+element["Mining and Extraction"]
      element['total']=total
      
    });
    

    const chart1=AreaChart('.areachart')
    chart1.update(data)

    const chart2=StackedAreaChart('.stacked')
    chart2.update(data)

    chart1.on("brushed", (range)=>{
      chart2.filterByDate(range); // coordinating with stackedAreaChart
    })
})


