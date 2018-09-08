function ChartService() {
  'ngInject';


  const service = {};

  //This service renders the chart shown in Investor Summary Page

  service.render = function(param) {
    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: param.type
      },
      tooltip: {
        pointFormat: param.pointFormat,
        enabled: true
      },
      plotOptions: {
        pie: {
          colors: param.color,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: param.format,
            style: {
              'fontSize': '20px'
            }
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      exporting: { enabled: false },
      series: param.series
    });
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          }
        }
      }]
    }
  }

  return service;

}
export default {
  name: 'ChartService',
  fn: ChartService
};
