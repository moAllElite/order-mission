import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BarChartService } from '../../../services/charts/bar-chart.service';
import { OrderMissionService } from '../../../services/order-mission.service';
import { OrdreMission, Statut } from '../../../models/ordre-mission';
import { map } from 'rxjs';


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports:[BaseChartDirective,MatCardModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  constructor(
    public chartService: BarChartService,
    readonly orderService: OrderMissionService
  ) {}

  totalMissionValid: WritableSignal<number> = signal(0);

  missionsPrevalid: OrdreMission[] = [];
  labels :string[]= [];
  datasChart:any ;
  stats:number[]=[];
  directions:string[]=[];



  ngOnInit(): void {
    this.loadChartRessources();
  }

 loadTotalValidMissionTransport(){
    this.chartService.getTotalValidMissionTransport()
     .subscribe({
        next: (data:OrdreMission[]) => {
          // Update chart data when missionsPrevalid is updated
          this.totalMissionValid.set(data.length)
          this.updateChart(this.totalMissionValid(),'Transport');
        }
      });
  }


  loadTotalValidMissionDistribution(){
    this.chartService.getTotalValidMissionDistribution()
     .subscribe({
        next: (data:OrdreMission[]) => {
          // Update chart data when missionsPrevalid is updated
          this.updateChart(data.length,'Distribution');
        }
      });
  }

   // get total valid mission from DSI Depart.
  loadTotalValidMissionDRH(){
    this.chartService.getTotalValidMissionDRH()
     .subscribe({
        next: (data:OrdreMission[]) => {
          // Update chart data when missionsPrevalid is updated
          this.totalMissionValid.set(data.length)
          this.updateChart(data.length,'DRH');
        }
      });
  }


   // get total valid mission from DSI
   loadTotalValidMissionDSI(){
    this.chartService.getTotalValidMissionDRH()
     .subscribe({
        next: (data:OrdreMission[]) => {
          // Update chart data when missionsPrevalid is updated
          this.totalMissionValid.set(data.length)
          this.updateChart(data.length,'DSI');
        }
      });
  }

  updateChart(num:number,lab:string) {
    this.stats.push(num);
    this.labels.push(lab);
  }





  loadChartRessources(){
    this.loadTotalValidMissionTransport();
    this.loadTotalValidMissionDRH();
    this.loadTotalValidMissionDistribution();
    this.loadTotalValidMissionDSI();
    this.datasChart ={
      labels: this.labels,
      datasets: [{
        label: 'Missions validées',
        data: this.stats,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
  }
}
