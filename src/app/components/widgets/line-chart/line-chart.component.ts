import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { RadarChartService } from '../../../services/charts/line-chart.service';
/**
 * LIne chart
 */
@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports:[BaseChartDirective,MatCardModule],
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
         public radarChartService:RadarChartService
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
    this.radarChartService
    .loadPayementDSI()
    .subscribe((data) => {
      this.updateChart(data,"DSI");
    });
  }

  getStatsPaymentsDRH(){
    this.radarChartService
    .loadPayementDrh()
    .subscribe((data) => {
      this.updateChart(data,"DRH");
    });
  }

  getStatsPaymentsTransport(){
    this.radarChartService
    .loadPayementDrh()
    .subscribe((data) => {
      this.updateChart(data,"Transport");
    });
  }


  //get sold payment distribution
  getStatsPaymentsDistribution(){
    this.radarChartService
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
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
    }
  }


    // add data and label to the chart
    updateChart(num:number,lab:string) {
      this.stats.push(num);
      this.labels.push(lab);
    }
}
