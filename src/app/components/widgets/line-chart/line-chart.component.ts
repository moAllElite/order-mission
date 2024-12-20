import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { LineChartService } from '../../../services/charts/line-chart.service';
import { CHART_COLORS, transparentize } from '../../../models/chart-color';
/**
 * LIne chart
 */
@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports:[BaseChartDirective,MatCardModule,  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent  implements OnInit {
    // params
    labels :string[]= [];
    datasChart:any ;
    stats:number[]=[];
    mode:string[]=[];

     constructor(
         readonly lineChartService:LineChartService
      ) {}


  ngOnInit(): void {
    this.loadRessources();
  }


  //get all data

  getData(){
    this.getStatsPaymentsDSI();
    this. getStatsPaymentsDRH();
    this.  getStatsPaymentsDistribution();
    this.getStatsPaymentsTransport();
  }

  getStatsPaymentsDSI(){
    this.lineChartService
    .loadPayementDSI()
    .subscribe((data) => {
      this.updateChart(data,"DSI");
    });
  }

  getStatsPaymentsDRH(){
    this.lineChartService
    .loadPayementDrh()
    .subscribe((data) => {
      this.updateChart(data,"DRH");
    });
  }

  getStatsPaymentsTransport(){
    this.lineChartService
    .loadPayementDrh()
    .subscribe((data) => {
      this.updateChart(data,"Transport");
    });
  }


  //get sold payment distribution
  getStatsPaymentsDistribution(){
    this.lineChartService
    .loadPayementDistribution()
    .subscribe((data) => {
      this.updateChart(data,"Distribution");
    });
  }

  //load all parameters for polar area datasets
  loadRessources(){
    this.getData();
    this.datasChart = {
      labels: this.labels,
    datasets: [{
      label: 'Paiements de frais de mission',
      data: this.stats,
      fill: false,
      borderColor: CHART_COLORS.green,
      backgroundColor: transparentize(CHART_COLORS.green, 0.5),
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
      tension: 0.1
    }],options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: (ctx:any) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
          }
        }
      }
    }
  }


    // add data and label to the chart
    updateChart(num:number,lab:string) {
      this.stats.push(num);
      this.labels.push(lab);
    }
}
