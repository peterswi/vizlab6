
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

  export default AreaChart