import { Injectable } from '@angular/core';
import { OrderMissionService } from '../order-mission.service';
import { OrdreMission, Statut } from '../../models/ordre-mission';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoughnutChartService {

  constructor(protected orderService:OrderMissionService) { }

  // get all mission which has been prevalid
  public    getValidMission() {

    return  this.orderService
      .loadOrdersMissions()
      .pipe(
        map((orders: OrdreMission[]) => {
          // Filter missions with "valider" status
          return orders.filter(
             (order) => {
               return order.statut === Statut.Valider
             }
          );
        })
      );

    }


    // get all mission which has been prevalid
    public    getPrevalidMission() {

     return  this.orderService
       .loadOrdersMissions()
       .pipe(
         map((orders: OrdreMission[]) => {
           // Filter missions with "Prevalider" status
           return orders.filter(
              (order) => {
                return order.statut === Statut.Prevalider
              }
           );
         })
       );

     }

     // get all waiting for validation
     public    getPendingMission() {
      return  this.orderService
        .loadOrdersMissions()
        .pipe(
          map((orders: OrdreMission[]) => {
            // Filter missions with "Prevalider" status
            return orders.filter(
               (order) => {
                 return order.statut === Statut.EnAttente
               }
            );
          })
        );

      }

    // get all mission which has been prevalid
    public    getRejecteMission() :Observable<OrdreMission[]>{
      return this.orderService
       .loadOrdersMissions()
       .pipe(
         map((orders: OrdreMission[]) => {
           // Filter missions with " Rejeter" status
           return orders.filter(
              (order) => {
               return order.statut === Statut.Rejeter

              }
           );
         })
       );
     }
}
