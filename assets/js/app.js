// canvas and svg width and height
const svgWidth = 900
const svgHeight = 600
const margin = {
    top: 40,
    right: 40,
    bottom: 80,
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

// successHandle
function visualization(states) {
  
  // data loop
  states.map(function (data) {
    data.poverty = +data.poverty
    data.obesity = +data.obesity
  })

  // scale fnxs with min and max
  const linearScaleX = d3.scaleLinear().domain([8.1, d3.max(states, d => d.poverty)]).range([0, width])
  const linearScaleY = d3.scaleLinear().domain([20, d3.max(states, d => d.obesity)]).range([height, 0])

  // call scale fnx with axes fnxs
  const bottomAxis =  d3.axisBottom(linearScaleX)
  const leftAxis =  d3.axisLeft(linearScaleY)

  // append axes to chartGroup
  chartGroup.append('g').attr('transform', `translate(o, ${height})`).call(bottomAxis)
  chartGroup.append('g').call(leftAxis)

  // create plot markers
  const circlesGroup = chartGroup.selectAll('circle').data(states).enter().append('circle')
    .attr('cx', d=>linearScaleX(d.poverty)).attr('cy', d=>linearScaleY(d.obesity))
    .attr('r', '15').attr('fill', '#9AAAD1').attr('opacity', '0.6')

}