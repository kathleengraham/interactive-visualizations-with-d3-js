// canvas and svg width, height, and margins
const svgWidth = 900
const svgHeight = 450
const margin = {
    top: 25,
    right: 50,
    bottom: 50,
    left: 90
  }
const width = svgWidth - margin.left - margin.right
const height = svgHeight - margin.top - margin.bottom

// canvas
const svg = d3.select('#scatter').append('svg').attr('width', svgWidth).attr('height',svgHeight)

// chartGroup
const chartGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

// data
const dataFile = 'assets/data/data.csv'
d3.csv(dataFile).then(visualization)

// plot function
function visualization(states) {
  
  // data loop
  states.map(function (data) {
    data.poverty = +data.poverty
    data.obesity = +data.obesity
  })

  // scale fnxs with min and max (plus a little more space)
  const linearScaleX = d3.scaleLinear().domain([8,d3.max(states,(d,i)=>d.poverty+0.5)]).range([0, width])
  const linearScaleY = d3.scaleLinear().domain([20,d3.max(states,(d,i)=>d.obesity+1)]).range([height, 0])

  // call scale fnx with axes fnxs with set tick marks on x axis
  const bottomAxis =  d3.axisBottom(linearScaleX).ticks(10)
  const leftAxis =  d3.axisLeft(linearScaleY)

  // append axes to chartGroup
  chartGroup.append('g').attr('transform', `translate(0, ${height})`).call(bottomAxis)
  chartGroup.append('g').call(leftAxis)

  // create plot markers
  let circlesGroup = chartGroup.selectAll('circle').data(states).enter().append('circle')
    .attr('cx',d=>linearScaleX(d.poverty)).attr('cy',d=>linearScaleY(d.obesity))
    .attr('r','17').attr('fill','#9AAAD1').attr('opacity','0.85')
    
  // add state abbreviations to circles (centered on both x and y of circle)
  circlesGroup = chartGroup.selectAll().data(states).enter().append('text')
    .attr('x',d=>linearScaleX(d.poverty)).attr('y',(d,i)=>linearScaleY(d.obesity)+4)
    .style('font-size','15px').style('text-anchor','middle').style('fill','white').text(d=>(d.abbr))

  // more interactive section to be added later
}