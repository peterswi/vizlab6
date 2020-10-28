//import AreaChart from './AreaChart'
//import StackedAreaChart from './StackedAreaChart'



d3.csv('data/unemployment.csv',d3.autoType).then(data=>{
    
    let total
    data.forEach(element => {
      //need to find all the sums
      total=element["Agriculture"]+element["Wholesale and Retail Trade"]+element["Manufacturing"]+element["Leisure and hospitality"]+element["Business services"]+element["Construction"]+element["Education and Health"]+element["Government"]+element["Finance"]+element["Self-employed"]+element["Other"]+element["Transportation and Utilities"]+element["Information"]+element["Mining and Extraction"]
      element['total']=total
      
    });
    console.log(data.columns.slice(1,15))

    const chart1=AreaChart('.areachart')
    chart1.update(data)

    const chart2=StackedAreaChart('.stacked')
    chart2.update(data)
})


// input: selector for a chart container e.g., ".chart"
function AreaChart(container){
 
  // initialization
  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale=d3.scaleTime()
    .range([0,width])
    
  
  const yScale=d3.scaleLinear()
    .range([height, 0]) 

  const xAxis = d3.axisBottom()
    .scale(xScale)
  
  const yAxis = d3.axisLeft()
    .scale(yScale)
  
  svg.append("g")
    .attr("class", "axis x-axis")

  svg.append("g")
    .attr("class", "axis y-axis")

  svg.append("path")
      .attr('class', 'path')

  function update(data){ 

    // update scales, encodings, axes (use the total count)
      xScale.domain(d3.extent(data, d => d.date))

      yScale.domain(d3.extent(data, d => d.total))

      const area = d3.area()
            .x(d => xScale(d.date))
            .y1(d => yScale(d.total))
            .y0(d => yScale.range()[0])
        
      d3.select('.path')
          .datum(data)
          .attr("d", area)

      svg.select('.x-axis')
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

      svg.select('.y-axis')
        .call(yAxis)
		
	}

	return {
		update // ES6 shorthand for "update": update
	};
}

function StackedAreaChart(container) {
	// initialization
  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale=d3.scaleTime()
    .range([0,width])

  const yScale = d3.scaleLinear()
      .range([height,0])
  
  const typeScale = d3.scaleOrdinal()
      .range(d3.schemeAccent);

  const xAxis = d3.axisBottom()
    .scale(xScale)
  
  const yAxis = d3.axisLeft()
    .scale(yScale)
  
  svg.append("g")
    .attr("class", "axis x-axis")

  svg.append("g")
    .attr("class", "axis y-axis")

  svg.append("path")
        .attr('class', 'path')

	function update(data){
    const keys=data.columns.slice(1)

    var stack = d3.stack()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
    
    var stackData=stack(data)
    

    typeScale.domain(keys)
    xScale.domain(d3.extent(data, d => d.date))
    yScale.domain([0, d3.max(stackData,
       a => d3.max(a, d=>d[1]))])

    const area = d3.area()
      .x(d => xScale(d.date))
      .y1(d=>yScale(d[1]))
      .y0(d=>yScale(d[0]))

    const areas = svg.selectAll("mylayers")
      .data(stackData, d => d.key);
    
    areas.enter() // or you could use join()
	    .append("path")
      .style("fill", function(d) { return typeScale(d.key); })
	    .merge(areas)
      .attr("d", area)

    areas.exit().remove();
    svg.select('.x-axis')
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

      svg.select('.y-axis')
        .call(yAxis)
	}
	return {
		update
	}
}