var margin = { top: 50, right: 0, bottom: 100, left: 30 },
      width = 960 - margin.left - margin.right,
      height = 730 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 24),
      legendElementWidth = gridSize * 2,
      buckets = 9,
      colors = ["#cd0000","#da552c","#f98f13","#e7be44","#f1d882","#1d91c0","#225ea8","#253494","#081d58"].reverse(), // alternatively colorbrewer.YlGnBu[9]
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      datasets = ["global-temps.json"],
      rangeStart = 0;

var svg = d3.select(".heatmap").append("svg")
  .attr("width", width + margin.left + margin.right + 20)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

var monthLabels = svg.selectAll('.monthLabel')
  .data(months)
  .enter().append('text')
  .text(function(d) { return d; })
  .attr('x', 0)
  .attr('y', function(d, i) { return i * gridSize; })
  .style('text-anchor', 'end')
  .attr('transform', 'translate(35, ' + gridSize / 1.5 + ')')
  .attr('class', function(d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis")});

var heatmapChart = function() {
  d3.json(datasets[0], function(err, data) {
    if(err) throw err;
    
    //format data to fit the layout
    data = data.monthlyVariance.splice(rangeStart, (12 * 24)).map(function(month, ind) {
      return {
        month: +month.month - 1,
        year: +month.year,
        value: +month.variance + +data.baseTemperature
      }
    });

    var years = [];
    for(var i = 0; i < data.length; i += 12) {
      years.push(data[i].year);
    }
    var startYear = years[0];

    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
        .range(colors);

    svg.selectAll('rect').remove();
    var cards = svg.selectAll(".year")
        .data(data, function(d) {return d.month+':'+d.year;});


    svg.selectAll('.yearLabel').remove();
    var yearLabels = svg.selectAll(".yearLabel")
        .data(years)
        .enter().append("text")
          .text(function(d) { return d; })
          .attr("x", function(d, i) { return i * gridSize; })
          .attr("y", 0)
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + gridSize / .7 + ", -6)")
          .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "yearLabel mono axis axis-worktime" : "yearLabel mono axis"); });

    cards.enter().append("rect")
        .attr("x", function(d) { return 35 + (d.year - startYear) * gridSize; })
        .attr("y", function(d) { return (d.month) * gridSize; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "month bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0])
        .append('title')
          .text(function(d) { return "Temp: " + d.value;});

    cards.transition().duration(200)
        .style("fill", function(d) { return colorScale(d.value); });

    cards.exit().remove();

    var legend = svg.selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function(d) { return d; });


    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return Math.ceil(d * 100) / 100; })
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height + gridSize)
      .attr('text-anchor', 'right');

    legend.exit().remove();

  });
};

heatmapChart();

function rangeBack() {
  if(rangeStart >= (12 * 24)) {
    rangeStart -= (12 * 24);
    heatmapChart();
  }
}

function rangeNext() {
  if(rangeStart < (3153 - 288)) {
    rangeStart += (12 * 24);
    heatmapChart();
  }
}
