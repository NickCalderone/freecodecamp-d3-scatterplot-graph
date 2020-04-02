d3.json('https://pomber.github.io/covid19/timeseries.json', (error, response) => {
     return response
}).then(response => {
     const dataUs = response['US']
     console.log(dataUs.map(d => d['confirmed']))
     const h = 600
     const w = 1500
     const padding = 100     
     const barWidth = (w - (padding * 2)) /dataUs.length

     const svg = d3.select('body')
          .append('svg')
          .attr('width', w)
          .attr('height', h)
          .attr('x', 0)
          .attr('y', 0)
     
     const xScale = d3.scaleTime()
          .domain([d3.min(dataUs, d => new Date(d['date'])), d3.max(dataUs, d => new Date(d['date']))])
          .range([padding, w - padding])
     const yScale = d3.scaleLinear()
          .domain([0 , d3.max(dataUs, d => d['confirmed'])])
          .range([h - padding, padding])
          console.log(yScale(1), yScale(5000), yScale(100000))
     svg
          .selectAll('rect')
          .data(dataUs.map(d => d['confirmed']))
          .enter()
          .append('rect')
          .attr('width', barWidth)
          .attr('height', d => h - padding - yScale(d))
          .attr('x', (d,i) => padding + ((w - 2 * padding) / dataUs.length * i))
          .attr('fill', 'red')
          .attr('y', d => (h - padding) - (h - padding - yScale(d)))
     
     const xAxis = d3.axisBottom(xScale)
     const yAxis = d3.axisLeft(yScale)
     svg.append('g')
          .attr('id', 'x-axis')
          .attr('transform', 'translate(0,' + (h - padding) + ')')
          .call(xAxis)
     svg.append('g')
          .attr('id', 'y-axis')
          .attr('transform', 'translate('+ (padding) + ', 0)')
          .call(yAxis)
})


 