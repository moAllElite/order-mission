import { Injectable, signal, WritableSignal } from '@angular/core';
import { OrderMissionService } from '../order-mission.service';
import { OrdreMission, Statut } from '../../models/ordre-mission';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor(protected orderService:OrderMissionService) { }


  public  countPending :WritableSignal<number> = signal(0);


   //get all mission which open and waiting for validation
   public getMissionOpen(){
      this.orderService.loadOrdersMissions()
    .pipe(
      map(
        (orders:OrdreMission[]) =>{

         // Filter missions with " En attente" status
          return orders.filter(
            (order) => order.statut === Statut.EnAttente
          )
        }
      )
    );
    return  this.countPending.update(v=> v+ 1);
   }

   public getTotalMissionCurrentMonth():Observable<OrdreMission[]>{
    return this.orderService.loadOrdersMissions()
    .pipe(
      map((orders:OrdreMission[])=>{
        return  orders.filter(
         (order ) => {
            // Ensure date_deb is a Date object
            const dateDeb = new Date(order.date_deb);
            // Filter for December (months are 0-based, so 11 = December)
            return dateDeb.getMonth() === 11; // December
        }
        );
      })
    );
   }


   // get total valid from Transport Depart.
  public    getTotalValidMissionTransport() :Observable<OrdreMission[]>{
    return this.orderService
     .loadOrdersMissions()
     .pipe(
       map((orders: OrdreMission[]) => {
         // Filter missions with "Prevalider" status
         return orders.filter(
            (order) => (order.statut === Statut.Valider
             &&
             order.salarie.direction ==='Transport'
           )
         );
       })
     );
   }

    // get total valid from drh Depart.
  public    getTotalValidMissionDRH() :Observable<OrdreMission[]>{
    return this.orderService
     .loadOrdersMissions()
     .pipe(
       map((orders: OrdreMission[]) => {
         // Filter missions with "valider" status
         return orders.filter(
            (order) => (order.statut === Statut.Valider
             &&
             order.salarie.direction ==='DRH'
           )
         );
       })
     );
   }

    // get total prevalid from Transport Depart.
  public    getTotalValidMissionDistribution() :Observable<OrdreMission[]>{
    return this.orderService
     .loadOrdersMissions()
     .pipe(
       map((orders: OrdreMission[]) => {
         // Filter missions with "Prevalider" status
         return orders.filter(
            (order) => (order.statut === Statut.Valider
             &&
             order.salarie.direction ==='Distribution'
           )
         );
       })
     );
    }
}
