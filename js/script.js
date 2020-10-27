//import AreaChart from './AreaChart'
//import StackedAreaChart from './StackedAreaChart'



d3.csv('data/unemployment.csv',d3.autoType).then(data=>{
    console.log(data)
    let total
    data.forEach(element => {
      //need to find all the sums
      total=element["Agriculture"]+element["Wholesale and Retail Trade"]+element["Manufacturing"]+element["Leisure and hospitality"]+element["Business services"]+element["Construction"]+element["Education and Health"]+element["Government"]+element["Finance"]+element["Self-employed"]+element["Other"]+element["Transportation and Utilities"]+element["Information"]+element["Mining and Extraction"]
      element['total']=total
      
    });
    console.log(data)
 

})


// input: selector for a chart container e.g., ".chart"
function AreaChart(container){

  // initialization
  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const width = 450 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select(".areachart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale=d3.scaleTime()
      .range([0,width])
      
    
    const yScale=d3.scaleLinear()
      .range([height, 0]) 

	function update(data){ 

		// update scales, encodings, axes (use the total count)
		
	}

	return {
		update // ES6 shorthand for "update": update
	};
}