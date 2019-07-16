import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  chart;
  totalBooks = 0;
  chartData;
  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.chartData = [];
    this.config.getBooksFromDb()
    .subscribe(result => {
      console.log(result);
      result.forEach(element => {
        this.totalBooks += element.noDownloads;
        this.chartData.push({name: element.title, y: element.noDownloads ? element.noDownloads : 0})
      });
      this.createChart();
    })
  }

  createChart(){
    this.chart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'No of books downloaded'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color:  'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        type: "pie",
        colorByPoint: true,
        data: this.chartData
        // data: [{
        //   name: 'Chrome',
        //   y: 61.41,
        //   sliced: true,
        //   selected: true
        // }, {
        //   name: 'Internet Explorer',
        //   y: 11.84
        // }, {
        //   name: 'Firefox',
        //   y: 10.85
        // }, {
        //   name: 'Edge',
        //   y: 4.67
        // }, {
        //   name: 'Safari',
        //   y: 4.18
        // }, {
        //   name: 'Sogou Explorer',
        //   y: 1.64
        // }, {
        //   name: 'Opera',
        //   y: 1.6
        // }, {
        //   name: 'QQ',
        //   y: 1.2
        // }, {
        //   name: 'Other',
        //   y: 2.61
        // }]
      }]
    });
  }


}
