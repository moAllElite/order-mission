import { AfterViewInit, Component, DEFAULT_CURRENCY_CODE,  ElementRef, inject, OnInit, Pipe, QueryList, signal, Signal, ViewChild, ViewChildren, WritableSignal } from '@angular/core';
  // for dashboards
import { OrderMissionService } from '../../services/order-mission.service';
import { OrdreMission } from '../../models/ordre-mission';
import { DoughnutChartComponent } from '../widgets/doughnut-chart/doughnut-chart.component';
import { MatCardModule } from '@angular/material/card';
import { BarChartComponent } from "../widgets/bar-chart/bar-chart.component";
import { LoadingSpinnerComponent } from "../widgets/loading-spinner/loading-spinner.component";
import { MatIconModule } from '@angular/material/icon';
import { BarChartService } from '../../services/charts/bar-chart.service';
import { PolarAreaChartComponent } from "../widgets/polar-area-chart/polar-area-chart.component";
import { LineChartComponent } from "../widgets/line-chart/line-chart.component";
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../models/paiement';
import { Observable,map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Chart } from 'chart.js';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AnalyticsService } from '../../services/charts/analytics.service';
@Component({
  selector: 'app-dashboards',
  standalone:true,
  imports: [
    DoughnutChartComponent, MatCardModule, MatIconModule,
    BarChartComponent, LoadingSpinnerComponent,
    PolarAreaChartComponent,
   LineChartComponent,CommonModule,CurrencyPipe
],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent implements OnInit{

  numberOfMissionOncurrent :WritableSignal<number> =signal(0);
  currentMonthSpending : WritableSignal<number> =signal(0);
  constructor(readonly chartService:BarChartService
    ,readonly analyticService:AnalyticsService

  ){}
  ngOnInit(): void {

      this.totalMissionCurrentMonth();
      this.getTotalSpending();
      this.getTotalSpendingCurrentMonth();
      this. getTotalSpendingQuarterMonth();

    const target = this.numberOfMissionOncurrent();
    this.animateCounter(target, this.counter.nativeElement);
  }
  //get the total amount spending annual
  getTotalSpending(){
    this. analyticService.getTotalPayment().subscribe({
      next: (sum: number) => {
        console.log(sum);
        this.totalSpending.set(sum);
      }
    })
  }
  // get the total mission on current month
  totalMissionCurrentMonth(){
    this.chartService.getTotalMissionCurrentMonth()
    .subscribe(
      {
        next: (result:OrdreMission[]) => {
          return  this.numberOfMissionOncurrent.set(result.length)
        }
      }
    )
  }
  //
  totalSpending:WritableSignal<number> =signal(0);
  totalSpendingQuarterMonth:WritableSignal<number> =signal(0);


  getTotalSpendingCurrentMonth(){
    this. analyticService.getTotalPaymentForCurrentMonth()
    .subscribe(
      {
        next: (value)=>this.currentMonthSpending.set(value)
      }
    );
  }

  getTotalSpendingQuarterMonth(){
    this.analyticService.getTotalPaymentForQuarterMonth()
    .subscribe(
      {
        next: (value)=>this. totalSpendingQuarterMonth.set(value)
      }
    );
  }
  @ViewChild('counter', { static: true }) counter!: ElementRef;




  animateCounter(target: number,counterElement: HTMLElement): void {
    counterElement.innerText = '0';
    const increment = target / 200;

    const updateCounter = () => {
      const current = +counterElement.innerText;
      if (current < target) {
        counterElement.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 1);
      } else {
        counterElement.innerText = `${target}`;
      }
    };
    updateCounter();
  }
}
