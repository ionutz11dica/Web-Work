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
      result.sort(this.compare);
      result.forEach((element,idx) => {
        if(idx <= 6){
          this.totalBooks += element.noDownloads;
          this.chartData.push({name: element.title, y: element.noDownloads ? element.noDownloads : 0})
        }
      });
      this.createChart();
    })
  }

  compare( a, b ) {
    if(a.noDownloads == undefined) a.noDownloads = 0;
    if(b.noDownloads == undefined) b.noDownloads = 0;
    if ( a.noDownloads < b.noDownloads ){
      return 1;
    }
    if ( a.noDownloads > b.noDownloads ){
      return -1;
    }
    return 0;
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
        text: 'Top 7 most downloaded books'
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
      }]
    });
  }


}
