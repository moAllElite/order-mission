import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts'; // for dashboards
import { OrderMissionService } from '../../services/order-mission.service';
import { OrdreMission } from '../../models/ordre-mission';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { A11yModule } from '@angular/cdk/a11y';

Chart.register(... registerables) // for charts

@Component({
  selector: 'app-dashboards',
  standalone: false,

  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent implements OnInit{

  constructor(private orderService: OrderMissionService){} // inject OrderMission Service
  chartData:WritableSignal<OrdreMission[] | null> = signal([]);

  // charts params

  chartLabels : any =[];
  realData :any[] =[];
  colorCharts: any ;

  // Calculate the start date for the last six months
    currentDate = new Date();
   sixMonthsAgo = new Date('2024-04-01');

  // directions counters
  missionCount : number = 0;


  // on app initialize we load all orders data
  ngOnInit(): void {
    this.loadChartDataLastSixMonth();
  }


  //we load chart data from your db.json
  public loadChartDataLastSixMonth(){
      this.orderService.loadOrdersMissions()
      .subscribe(
        (data: OrdreMission[]) => {
          this.chartData.set(data);
          console.log( this.chartData());
          data
          .map(
             o => {
               this.chartLabels.push(o.dateDeb);
               const missionDate = new Date(o.dateDeb); // Ensure it's a Date object
               this.chartLabels.push(missionDate);

               // Check if the date is within the last six months
               if (missionDate >= this.sixMonthsAgo && missionDate <= this.currentDate) {
                 this.missionCount += 1;
               }

               // Update the realData array
               this.realData.push(this.missionCount);
              }
          )

          this.RenderBartChar(this.chartLabels,this.realData)

        }
      );

  }

  // load graphic

  RenderBartChar(labelData:any,valueData:any ){
     const myChar = new Chart(
      'barchat',
      {
        type: 'bar',
        data:{
          labels: labelData,
          datasets :[
            {
              label:'Mission dernier semestre',
             data: valueData
          }
        ]
        },
        options:{
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          }
        }
      }
     )
  }
}
