d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', response => {
     return response.json()
}).then(response => {
     console.log(response)

     d3.scaleTime()
     .domain([d3.max(response, d => d.time)])
})