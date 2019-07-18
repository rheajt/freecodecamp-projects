var width = 960,
    height = 700;

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].reverse();

var projection = d3.geo.mercator()
    .center([0, 50])
    .scale(200)
    .rotate([-180,0]);

var svg = d3.select(".map").append("svg")
    .attr("width", width)
    .attr("height", height);


var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g");

// load and display the World
d3.json("world-110m2.json", function(error, topology) {

  g.selectAll("path")
    .data(topojson.object(topology, topology.objects.countries).geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

//load meteorites
d3.json('meteorite-strike-data.json', function(err, meteorites) {

  console.log(meteorites.features);

  var colorScale = d3.scale.quantile()
    .domain([0, colors.length - 1, d3.max(meteorites.features, function (d) { return d.properties.mass; })])
    .range(colors);

  var massScale = d3.scale.linear()
    .domain([0, 23000000])
    .range([5, 50]);

  var meteorStrike = g.selectAll('circle')
    .data(meteorites.features)
    .enter()
      .append('circle')
      .attr('r', .25)
      .attr('cx', function(d) {
        return projection([d.properties.reclong, d.properties.reclat])[0];
      })
      .attr('cy', function(d) {
        return projection([d.properties.reclong, d.properties.reclat])[1];
      })
      .attr('fill', function(d) {return colorScale(d.properties.mass);});

  meteorStrike.transition().duration(2000)
    .attr('r', function(d) {
      return massScale(d.properties.mass);
    });

  //create the hover data
  meteorStrike.append('title')
    .text(function(d) {
      return 'Name: '+ d.properties.name +
        '\nMass: ' + d.properties.mass +
        '\nData: ' + new Date(d.properties.year).toDateString();
    });
});



// zoom and pan
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")
            .attr("d", path.projection(projection));
  });

svg.call(zoom)
