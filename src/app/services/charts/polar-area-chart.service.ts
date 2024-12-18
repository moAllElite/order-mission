import { Injectable } from '@angular/core';
import { PaiementService } from '../paiement.service';
import { MoyenDeTransfer, Paiement } from '../../models/paiement';
import { map, Observable, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolarAreaChartService {

  constructor(private payementService:PaiementService) { }


  //get sum freemoney
  public loadPayementByFreeMoney():Observable<number>{
   return this.payementService.getPayments()
    .pipe(
      (
        map(
          (response: Paiement[]) => {
            const om= response.filter(
              (item: Paiement) => item.moyen_de_transfert === MoyenDeTransfer.FreeMoney
            );
            const total =
            om.reduce(
              (sum,om)=> sum + om.montant ,0
            );
            console.log( total);
            return total;
          }
         )

      )
    );
  }


  // get total payment by om
  public loadPayementByOrangeMoney():Observable<number>{
   return this.payementService.getPayments()
    .pipe(
      (
        map(
          (response: Paiement[]) => {
            const om= response.filter(
              (item: Paiement) => item.moyen_de_transfert === MoyenDeTransfer.OrangeMoney
            );
            const total =
            om.reduce(
              (sum,om)=> sum + om.montant ,0
            );
            return total;
          }
         )

      )
    );
  }

  //get sum of payement by wizall
  public loadPayementByWizall():Observable<number>{
   return this.payementService.getPayments()
    .pipe(
      (
        map(
          (response: Paiement[]) => {
           const wizall= response.filter(
              (item: Paiement) => item.moyen_de_transfert === MoyenDeTransfer.Wizall
            );

            // calculate sum
            const sum = wizall.reduce((sum, wizall) => sum + wizall.montant,0);
            return sum;
          }
         )
      )

    );

  }


  //get sum payments done by wave
  public loadPayementByWave():Observable<number>{
  return  this.payementService.getPayments()
    .pipe(
      (
        map(
          (response: Paiement[]) => {
            const wizall= response.filter(
              (item: Paiement) => item.moyen_de_transfert === MoyenDeTransfer.Wave
            );

            // calculate sum
            const sum = wizall.reduce((sum, wizall) => sum + wizall.montant,0);
            return sum;
          })
      )
    );
  }

  //get sum payments done by visa bank
  public loadPayementByVisa():Observable<number>{
    return  this.payementService.getPayments()
      .pipe(
        (
          map(
            (response: Paiement[]) => {
              const visa  = response.filter(
                (item: Paiement) => item.moyen_de_transfert === MoyenDeTransfer.VirementBancaire
              );
              // calculate sum
              const sum = visa.reduce((sum, visa) => sum + visa.montant,0);
              console.log(sum);
              return sum;
            })
        )
      );
    }


}
