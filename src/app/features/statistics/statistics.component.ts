import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  pieChart;
  barChart;
  totalBooks = 0;
  chartData;
  categories = [];
  categoriesByBook = {};
  dataCategories = [];
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
        this.categories.push(...element.categories);
      });
      //remove duplicate
      this.categories = this.categories.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.categories.forEach((elem,idx)=>{
        this.categoriesByBook[elem] = 0;
        this.dataCategories[idx] = 0;
      })
      result.forEach((element, index) => {
        element.categories.forEach((elem,idx)=>{
          if(this.categories.includes(elem)){
            this.categoriesByBook[elem] ++;
          }
        })
      });
      
      this.categories = Object.keys(this.categoriesByBook);
      this.dataCategories = Object.values(this.categoriesByBook);
      this.createPieChart();
      this.createBarChart();
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

  createPieChart(){
    this.pieChart = new Chart({
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

  createBarChart(){
    this.barChart = new Chart({
      title: {
        text: 'Books per categories'
    },

    subtitle: {
        text: 'Plain'
    },

    xAxis: {
        categories: this.categories
    },

    series: [{
        type: 'column',
        colorByPoint: true,
        data: this.dataCategories,
        showInLegend: false
    }]
    })
  }

}
