
// input: selector for a chart container e.g., ".chart"
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

const clip = svg.append("clipPath")
    .attr("id", "area")
    .append("rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0)
    .attr("y", 0);
  
  const tooltip=svg.append('text')
    .attr('x',0)
    .attr('y',0)
    .attr('font-size',16)

    let xDomain, data;

    function update(_data){
        data=_data
        const keys=data.columns.slice(1)

        var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);
        
        var stackData=stack(data)
        

        typeScale.domain(keys)
        xScale.domain(xDomain? xDomain: d3.extent(data, d => d.date))
        yScale.domain([0, d3.max(stackData,
        a => d3.max(a, d=>d[1]))])

        
        const area = d3.area()
            .x(d=>xScale(d.data.date))
            .y0(d=>yScale(d[0]))
            .y1(d=>yScale(d[1]))
        
        
        const areas = svg.selectAll("stacks")
        .data(stackData, d => d.key);
        
        areas.enter() // or you could use join()
            .append("path")
            .attr('clip-path','url(#area)')
            .style("fill", function(d) { return typeScale(d.key); })
            .attr("class", function(d) { return "myArea " + d.key })
            .on("mouseover", (event, d, i) => tooltip.text(d.key))
            .on("mouseout", (event, d, i) => tooltip.text(''))
            .merge(areas)
            .attr("d", area)
        

        areas.exit().remove();
        
        svg.select('.x-axis')
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

        svg.select('.y-axis')
            .call(yAxis)
    }
    function filterByDate(range){
		xDomain = range;  // -- (3)
		update(data); // -- (4)
	}
	return {
        update,
        filterByDate
	}
}
export default StackedAreaChart