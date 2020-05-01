d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', response => {
     return response.json()
}).then(response => {
     console.log(response)
     const yFormat = '%M:%S'
     const parsedData = response.map(d => {
          d.Time = d3.timeParse(yFormat)(d.Time)
          return d
     })
     console.log("parsed times ", parsedData)

     const h = 600
     const w = 1000
     const padding = 60

     const yScale = d3.scaleTime()
          .domain([d3.max(parsedData, d => d.Time), d3.min(parsedData, d => d.Time)])
          .range([h-padding, padding])
     
     const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat(yFormat))

     const xScale = d3.scaleLinear()
          .domain([d3.min(parsedData, d => d.Year) - 1, d3.max(parsedData, d => d.Year)])
          .range([padding, w - padding])

     const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))
     
     const title = d3.select('body')
          .append('h1')
          .attr('id', 'title')
          .text('Doping Allegations Of The 35 Fastest Bicycle Rides Up Alpe d\'Huez')

     const svg = d3.select('body')
          .append('svg')
          .attr('width', w)
          .attr('height', h)

     //added tooltip div
     d3.select('body')
          .append('div')
          .attr('id', 'tooltip')
          .attr('style', 'opacity: 0')
          .attr('style', 'position: absolute')

     svg.selectAll('circle')
          .data(parsedData)
          .enter()
          .append('circle')
          .attr('class', 'dot')
          .attr('data-xvalue', d => d.Year)
          .attr('data-yvalue', d => d.Time)
          .attr('cx', d => xScale(d.Year))
          .attr('cy', d => yScale(d.Time))
          .attr('r', 5)
          .attr('fill', d => {
               return d.Doping ? 'red' : 'green'
          })
          .on('mouseover', function(d) {d3.select('#tooltip').style('opacity', 1).attr('data-year', d.Year).text(`Name: ${d.Name}\nTime: ${d.Time.getMinutes()}:${d.Time.getSeconds()}\nPlace: ${d.Place}\nYear: ${d.Year}\nNationality: ${d.Nationality}\nDoping Allegations: ${d.Doping ? d.Doping : 'No Doping Allegations'}`)})
          .on('mouseout', function() {d3.select('#tooltip').style('opacity', 0)})
          .on('mousemove', function() {
              d3.select('#tooltip').style('left', (d3.event.pageX+10) + 'px').style('top', (d3.event.pageY) + 'px')
              })



          // How I actually want to make the tooltip
          // .append('title')
          // .text(d => {
          //      return `Name: ${d.Name}\nTime: ${d.Time.getMinutes()}:${d.Time.getSeconds()}\nPlace: ${d.Place}\nYear: ${d.Year}\nNationality: ${d.Nationality}\nDoping Allegations: ${d.Doping ? d.Doping : 'No Doping Allegations'}`
          // })
          // .attr('id', 'tooltip')
          // console.log('max :', d3.max(parsedData, d => d.Time), d3.min(parsedData, d => d.Time))
      
     svg.append("g")
          .attr('id', 'x-axis')
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis)

     svg.append("g")
          .attr('id', 'y-axis')
          .attr("transform", "translate(" + padding + ", 0)")
          .call(yAxis)

     const legend = d3.select('body')
          .append('svg')
          .attr('id', 'legend')
          .attr('x', 1200)
          .attr('height', 200)
          .attr('width', 300)
     
     legend.append('text')
          .attr('x', 30)
          .attr('y', 20)
          .text('Doping Allegations')

     legend.append('text')
          .attr('x', 30)
          .attr('y', 45)
          .text('No Doping Allegations')

     legend.append('circle')
          .attr('cx', 10)
          .attr('cy', 15)
          .attr('r', 5)
          .attr('fill', 'red')
     legend.append('circle')
          .attr('cx', 10)
          .attr('cy', 40)
          .attr('r', 5)
          .attr('fill', 'green')

})
