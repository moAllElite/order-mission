import { Injectable } from '@angular/core';
import { Paiement } from '../../models/paiement';
import { map, Observable } from 'rxjs';
import { PaiementService } from '../paiement.service';
import { Direction } from '../../models/ordre-mission';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

    constructor(public payementService:PaiementService) { }

  // GET PAYMENTS DONE BY depart. DSI
  public loadPayementDSI():Observable<number>{
    return  this.payementService.getPayments()
      .pipe(
        (
          map(
            (response: Paiement[]) => {
              const bills= response.filter(
                (item: Paiement) => item.beneficiaire.direction === Direction.DSI
              );
              // calculate sum
              const sum =bills.reduce((sum,bills) => sum +bills.montant,0);
              console.log(sum);
              return sum;
            })
        )
      );
    }

     // GET PAYMENTS DONE BY depart. Drh
  public loadPayementDrh():Observable<number>{
    return  this.payementService.getPayments()
      .pipe(
        (
          map(
            (response: Paiement[]) => {
              const bills= response.filter(
                (item: Paiement) => item.beneficiaire.direction === Direction.DRH
              );
              // calculate sum
              const sum =bills.reduce((sum,bills) => sum +bills.montant,0);
              console.log(sum);
              return sum;
            })
        )
      );
    }

       // GET PAYMENTS DONE BY depart. Drh
  public loadPayementTransport():Observable<number>{
    return  this.payementService.getPayments()
      .pipe(
        (
          map(
            (response: Paiement[]) => {
              const bills= response.filter(
                (item: Paiement) => item.beneficiaire.direction === Direction.Transport
              );
              // calculate sum
              const sum =bills.reduce((sum,bills) => sum +bills.montant,0);
              console.log(sum);
              return sum;
            })
        )
      );
    }


        // GET PAYMENTS DONE BY depart. Drh
  public loadPayementDistribution():Observable<number>{
    return  this.payementService.getPayments()
      .pipe(
        (
          map(
            (response: Paiement[]) => {
              const bills= response.filter(
                (item: Paiement) => item.beneficiaire.direction === Direction.Distribution
              );
              // calculate sum
              const sum =bills.reduce((sum,bills) => sum +bills.montant,0);
              console.log(sum);
              return sum;
            })
        )
      );
    }

}
