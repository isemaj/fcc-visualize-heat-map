import * as d3 from 'd3';

import '../styles/app.scss';

const api = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const width = 990;
const height = 540;
const padding = 65;

const svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const tooltip = d3.select("body")
  .append('div')
  .attr('id', 'tooltip')

document.addEventListener("DOMContentLoaded", (event) => {
  fetch(api)
    .then(res => res.json())
    .then(data => {

      // console.log(data.monthlyVariance)
      // console.log(data.monthlyVariance.length);

      const actualWidth = +svg.attr('width') - (padding * 2);
      const actualHeight = +svg.attr('height') - (padding * 2);

      const baseTemperature = data.baseTemperature;
      const monthlyVariance = data.monthlyVariance;
      const minMonths = d3.min(monthlyVariance, (d) => d.month);
      const maxMonths = d3.max(monthlyVariance, (d) => d.month);
      const minYears = d3.min(monthlyVariance, (d) => d.year);
      const maxYears = d3.max(monthlyVariance, (d) => d.year);
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const num_ticks = Math.floor((data.monthlyVariance.length / 12) / 10);

      // console.log(minYears);
      // console.log(maxYears);

      // console.log(d3.extent(monthlyVariance, (d) => d.year))

      // const timeFormat = d3.timeFormat('%M:%S');
      // const parseTime = d3.timeParse('%M:%S');
      // const colorOrdinal = d3.scaleOrdinal(d3.schemeSet2); 

      let xScale = d3.scaleLinear()
        .domain(d3.extent(monthlyVariance, (d) => d.year))
        .range([padding, width - padding])

      // // console.log(d3.extent(data, (d) => d.Seconds))

      // let yScale = d3.scaleTime()
      //   .domain([0, 11])
      //   .range([padding, height - padding])

      let yScale = d3.scaleBand()
        .domain(months)
        .rangeRound([padding, height - padding])

      // console.log(yScale(0))
      // console.log(yScale.domain())
      // console.log(new Date(0).utcMonth(0))
      console.log(yScale(0))

      let xAxis = d3.axisBottom(xScale)
        .ticks(num_ticks)
        .tickFormat(d3.format("d"))
        .tickSizeOuter(0)

      let yAxis = d3.axisLeft(yScale)
        .ticks(12)
        .tickSizeOuter(0)

      svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height - padding})`)

      svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)

    })
});

