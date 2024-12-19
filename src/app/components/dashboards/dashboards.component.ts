import { Component, DEFAULT_CURRENCY_CODE, inject, OnInit, Pipe, signal, Signal, WritableSignal } from '@angular/core';
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
  constructor(readonly chartService:BarChartService
    ,readonly paymentService:PaiementService
  ){}
  ngOnInit(): void {
    setTimeout(()=>{
      this.totalMissionCurrentMonth();
      this.getTotalSpending();
    },
    100);
  }
  //get the total amount spending annual
  getTotalSpending(){
    this.getTotalPayment().subscribe({
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


  //get annual amount spending on mission
  getTotalPayment():Observable<number>{
    return this.paymentService
    .getPayments()
    .pipe(
      map(
         (response: Paiement[]) => {
                      const bills= response.filter(
                        (item: Paiement) => item.montant
                      );
                      // calculate sum
                      const sum =bills.reduce((sum,bills) => sum +bills.montant,0);

                      return sum;
                    }
                  )
    )
  }



}
