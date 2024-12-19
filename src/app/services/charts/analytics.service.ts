import { Injectable } from '@angular/core';
import { PaiementService } from '../paiement.service';
import { map, Observable } from 'rxjs';
import { Paiement } from '../../models/paiement';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(readonly paymentService:PaiementService) { }

  month = (new Date().getMonth() + 1) > 1 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
  // current date begin & ending month
  previousQuarter = (new Date().getMonth() - 6) > 1 ? new Date().getMonth() - 6  : '0' + (new Date().getMonth() - 6)
  start = (this.month).toString().slice(-2) + '-' +'1'+ '-' + new Date().getFullYear().toString();
  end = (this.month).toString().slice(-2) + '-' +'30'+ '-' + new Date().getFullYear().toString();
  lastQuarter = (this.previousQuarter).toString().slice(-2) + '-' +'30'+ '-' + new Date().getFullYear().toString();
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



  //get  amount spending on mission during current month
  getTotalPaymentForCurrentMonth():Observable<number>{
    return this.paymentService
    .getPayments()
    .pipe(
      map(
         (response: Paiement[]) => {
             //convert to date
          const startDate =new Date(this.start);
          const endDate = new Date(this.end);
                      const bills= response.filter(
                        (item: Paiement) =>
                          {
                            return new Date(item.dateCreation) >= startDate
                             && new Date(item.dateCreation) <= endDate
                          }
                      );

                      // calculate sum
                      const sum =bills.reduce((sum,bills) => sum +bills.montant,0);

                      return sum;
                    }
                  )
    )
  }


  // get amount spending during last quarter
  getTotalPaymentForQuarterMonth():Observable<number>{
    return this.paymentService
    .getPayments()
    .pipe(
      map(
         (response: Paiement[]) => {
             //convert to date
          const startDate = new Date(this.lastQuarter);
          const endDate = new Date(this.end);
                      const bills= response.filter(
                        (item: Paiement) =>
                          {
                            return new Date(item.dateCreation) >= startDate
                             && new Date(item.dateCreation) <= endDate
                          }
                      );

                      // calculate sum
                      const sum =bills.reduce((sum,bills) => sum +bills.montant,0);

                      return sum;
                    }
                  )
    )
  }


}
