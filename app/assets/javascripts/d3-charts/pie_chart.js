var p_width  = 960,
    p_height = 500,
    p_radius = Math.min(p_width, p_height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(p_radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select(".pie_chart").append("svg")
    .attr("width", p_width)
    .attr("height", p_height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + p_height / 2 + ")");

d3.csv("http://0.0.0.0:3000/pie_chart.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = +d.population;
  });

  var g = d3.select(".pie_chart g").selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });

});