function renderTemperatureRanges(weeklyWeather) {
  // Prepare the categories (dates) and temperature ranges
  const categories = weeklyWeather.map(item => {
    const date = new Date(item.startTime);
    const options = {day: 'numeric', month: 'short'};
    return date.toLocaleDateString("en-us", options);
  });
  const temperatureMax = weeklyWeather.map(item => item.values.temperatureMax);
  const temperatureMin = weeklyWeather.map(item => item.values.temperatureMin);
  try {
    Highcharts.chart('temperature-ranges', {
      chart: {
        type: 'arearange',
        zoomType: 'x'
      },
      title: {
        text: 'Temperature Ranges (Min, Max)'
      },
      xAxis: {
        categories: categories,
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        },
        tickLength: 10,  // Length of the tick
        tickPosition: 'inside', // Ensure the tick is placed inside
        gridLineWidth: 1,  // Add a gridline to enhance the appearance
        tickInterval: 1  // Ensure a tick mark for every category
      },
      yAxis: {
        title: {
          text: 'Temperature (°F)'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: '°F'
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Temperatures',
        data: temperatureMax.map((max, i) => [temperatureMin[i], max]),
        color: 'orange',
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, 'rgba(255, 200, 0, 0.5)'],
            [1, 'rgba(0, 0, 255, 0.5)']
          ]
        }
      }]
    });
  } catch (error) {
    console.error("Failed to render temperature ranges", error);
    document.getElementById("temperature-ranges").innerHTML = "Failed to render temperature ranges";
  }
}

function renderHourlyWeather(hourlyWeather) {
  const temperatures = [];
  const pressures = [];
  const winds = [];
  const symbols = [];  // if you want to display weather symbols

  hourlyWeather.forEach(item => {
    const x = new Date(item.startTime).getTime();

    // Temperature
    temperatures.push({
      x: x,
      y: item.values.temperature,
    });

    // Pressure
    pressures.push({
      x: x,
      y: item.values.pressureSeaLevel,
    });

    // Wind speed and direction (for windbarbs)
    winds.push({
      x: x,
      value: item.values.windSpeed,
      direction: item.values.windDirection,
    });

    // Optionally: add symbols based on weather conditions if needed
    // symbols.push({ /* weather symbols */ });
  });

  // Chart options similar to Meteogram prototype
  Highcharts.chart('hourly-weather', {
    chart: {
      type: 'spline',
      height: 600,
      scrollablePlotArea: {
        minWidth: 720
      }
    },
    title: {
      text: 'Hourly Weather (Next Few Hours)'
    },
    xAxis: [{
      type: 'datetime',
      tickInterval: 36e5, // one hour
      labels: {
        format: '{value:%H:%M}'  // Format to show hour
      },
      crosshair: true,
    }],
    yAxis: [{ // Temperature Y-axis
      title: {
        text: 'Temperature (°F)'
      },
      labels: {
        format: '{value}°F'
      }
    }, { // Pressure Y-axis
      title: {
        text: 'Pressure (inHg)',
        align: 'high'
      },
      opposite: true,
      labels: {
        format: '{value} inHg'
      }
    }],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        return `<b>${Highcharts.dateFormat('%A %b %e %H:%M', this.x)}</b><br>
                    <b>Temperature:</b> ${this.points[0].y}°F<br>
                    <b>Pressure:</b> ${this.points[1].y} inHg<br>
                    <b>Wind Speed:</b> ${this.points[2].point.value} mph<br>
                    <b>Wind Direction:</b> ${this.points[2].point.direction}°`;
      }
    },
    series: [{
      name: 'Temperature',
      data: temperatures,
      color: '#FF3333',
      tooltip: {
        valueSuffix: '°F'
      }
    }, {
      name: 'Pressure',
      data: pressures,
      yAxis: 1,
      color: '#ffab00',
      dashStyle: 'ShortDot',
      tooltip: {
        valueSuffix: ' inHg'
      }
    }, {
      name: 'Wind Speed and Direction',
      type: 'windbarb',
      data: winds,
      vectorLength: 18,
      yOffset: -20,
      color: '#004d40',
      tooltip: {
        valueSuffix: ' mph'
      }
    }]
  });
}

export const renderCharts = (weeklyWeather, hourlyWeather) => {
  console.log("about to render charts");
  renderTemperatureRanges(weeklyWeather);
  renderHourlyWeather(hourlyWeather);
}

