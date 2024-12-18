import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { PolarAreaChartService } from '../../../services/charts/polar-area-chart.service';
import { ChartData } from 'chart.js';
@Component({
  selector: 'app-polar-area-chart',
  standalone: true,
  imports:[BaseChartDirective,MatCardModule],
  templateUrl: './polar-area-chart.component.html',
  styleUrl: './polar-area-chart.component.css'
})
export class PolarAreaChartComponent implements OnInit {
  // params
  labels :string[]= [];
  datasChart:any ;
  stats:number[]=[];
  mode:string[]=[]; 

  constructor(
     public polarChartService:PolarAreaChartService
  ) {}


  ngOnInit(): void {
    this.getData();
    this.loadRessources();
  }

  getData(){
    this.loadSumFreemoney();
    this.loadSumOrangemoney();
    this.loadSumWizall();
    this.loadSumWave();
    this.loadSumVisa();
  }


  //load all parameters for polar area datasets
  loadRessources(){
    this.datasChart = {
      labels: this.labels,
      datasets: [{
        label: 'Moyen de paiements',
        data: this.stats,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };
  }

  // get total sum freemoney.
    loadSumFreemoney(){
      this.polarChartService.loadPayementByFreeMoney()
       .subscribe({
          next: (data:number) => {
            // Update chart data when missionsPrevalid is updated
            this.updateChart(data,'Free Money');
          }
        });
    }

     // get total sum freemoney.
     loadSumOrangemoney(){
      this.polarChartService.loadPayementByOrangeMoney()
       .subscribe({
          next: (data:number) => {
            // Update chart data when missionsPrevalid is updated
            this.updateChart(data,'Orange Money');
          }
        });
    }

    // get sum wizall
    loadSumWizall(){
      this.polarChartService.loadPayementByWizall()
       .subscribe({
          next: (data:number) => {
            // Update chart data when missionsPrevalid is updated
            this.updateChart(data,'Wizall');
          }
        });
    }

  // get sum wizall
  loadSumWave(){
    this.polarChartService.loadPayementByWave()
     .subscribe({
        next: (data:number) => {
          // Update chart data when missionsPrevalid is updated
          console.log("wave"+data)
          this.updateChart(data,'Wave');
        }
      });
  }

  loadSumVisa(){
    this.polarChartService.loadPayementByVisa()
    .subscribe({
      next: (data:number) => {
        // Update chart data when payment mode is visa  updated
        console.log("virement:"+data)
        this.updateChart(data,'Virement bancaire');
      }
    });
  }

    // add data and label to the chart
  updateChart(num:number,lab:string) {
    this.stats.push(num);
    this.labels.push(lab);
  }

}
