import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OrdreMission } from '../../../models/ordre-mission';
import { DoughnutChartService } from '../../../services/charts/doughnut-chart.service';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports:[BaseChartDirective,MatCardModule,],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css'
})


export class DoughnutChartComponent implements OnInit{

  constructor(readonly chartService:DoughnutChartService){}
  totalPrevalid:WritableSignal<number> = signal(0);
  totalValid:WritableSignal<number> = signal(0);
  totalWaiting :WritableSignal<number> = signal(0);
  stats:number[]= [];
  public data:any;
  public labels :string[]=[];


  ngOnInit(): void {
    this.loadPrevalidStatics();
    this.loadRejectStats();
    this.loadMissionWaiting();
    this.loadValidStatics();
    setTimeout(()=> this.loadRessources(),100);

  }

  loadRessources(){
    return  this.data =
      {
        labels:this.labels,
        datasets: [{
          label: 'Total',
          data: this.stats,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(44 78 56)'
          ],
          hoverOffset: 4
        }]
      }
    }

  //get total mission which were rejected
  loadPrevalidStatics(){
    this.chartService.getPrevalidMission()
    .subscribe(
      {
        next: (value:OrdreMission[])=> {
          this.updateValue(value.length,'Missions Prévalidées');
        }
      }
    )
  }
  loadMissionWaiting(){
    this.chartService.getPendingMission()
    .subscribe({
      next: (value:OrdreMission[])=> {
        this.updateValue(value.length,'Missions en attente');
        console.log(value.length);
      }
    });
  }

  loadRejectStats(){
    return this.chartService.getRejecteMission()
    .subscribe(
      {
        next: (result:OrdreMission[])=>{
          console.log(result.length)
           return   this.updateValue(result.length,'Missions Rejectées')
        }
      }
    )
  }

  //get total mission which were validated
  loadValidStatics(){
    this.chartService.getValidMission()
    .subscribe(
      {
        next: (result:OrdreMission[])=>{
          console.log(result.length)
           return   this.updateValue(result.length,'Missions validées')
        }
      }
    );
  }

  updateValue(result:number,label:string){
    this.stats.push(result);
    this.labels.push(label);
  }

}
