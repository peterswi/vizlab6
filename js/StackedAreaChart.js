
// input: selector for a chart container e.g., ".chart"
function StackedAreaChart(container) {

    // initialization
    
let selected = null, xDomain, data;

  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const width = 400 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

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

    svg.append("clipPath")
        .attr("id", "area")
        .append("rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);
    
    svg.append('text')
        .attr('class','yaxisTitle')
        .attr("transform", "rotate(-90)")
        .attr('x',-60)
        .attr('y',20)
        .style('text-anchor','middle')
        .text("# Unemployed")
    
    svg.append('text')
        .attr('class','graphTitle')
        .attr('x',350)
        .attr('y',0)
        .text("US Unemployment 2000-2010")
        .style('text-anchor','middle')
        .style('font-weight','bolder')
        .attr('font-size',20)

  
  const tooltip=svg.append('text')
    .attr('x',0)
    .attr('y',0)
    .attr('font-size',14)

  

    function update(_data){
        data=_data

        const keys=selected? [selected] :data.columns.slice(1)

        var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);
        
        const stackData=stack(data)
        

        typeScale.domain(keys)
        xScale.domain(xDomain? xDomain: d3.extent(data, d => d.date))
        yScale.domain([0, d3.max(stackData,
        a => d3.max(a, d=>d[1]))])

        
        const area = d3.area()
            .x(d=>xScale(d.data.date))
            .y0(d=>yScale(d[0]))
            .y1(d=>yScale(d[1]))
        
        
        const areas = svg.selectAll(".area")
            .data(stackData, d => d.key)
           
        
        areas.enter() // or you could use join()
            .append("path")
            .merge(areas)
            .attr('class','area') 
            .attr("d", area)
            .attr('clip-path','url(#area)')
            .style("fill", function(d) { return typeScale(d.key); })
            .on("mouseover", (event, d) => tooltip.text(d.key))
            .on("mouseout", (event) => tooltip.text(''))
            .on("click", (event, d) => {
                // toggle selected based on d.key
                if (selected === d.key) {
                    selected = null;
                } else {
                    selected = d.key;
                }
                update(data); // simply update the chart again
            })
           
        
        areas.exit()
            .remove()
        
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