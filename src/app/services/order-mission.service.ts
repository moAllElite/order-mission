import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { OrdreMission } from '../models/ordre-mission';
import { Observable } from 'rxjs';
import {FormControl, FormGroup, ɵFormGroupValue, ɵTypedOrUntyped} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class OrderMissionService {

  public Host : string ='http://localhost:3000/ordre_missions';

  constructor(private http: HttpClient) { }
  // fetch all data from mission order

  //get all data from order mission

  public loadOrdersMissions() : Observable<OrdreMission[]>{
      return this.http
      .get<OrdreMission[]>(this.Host);
  }

  // filter order mission by
  public getMissionOrderByOrderNumber(num_odm:string):Observable<OrdreMission[]>{
    return this.http.get<OrdreMission[]>(this.Host + `?num_odm=${num_odm}`);
  }

  /**
   *  POST Method endpoint http://localhost:3000/ordre_missions
   *  Save new mission
   */
  public saveMissionOrder(order: OrdreMission | null):Observable<OrdreMission>{
    return this.http
      .post<OrdreMission>(
        this.Host ,
        order
      );
  }


  public preValidateMission(id: number, ordre:  OrdreMission ):Observable<OrdreMission>{
    return this.http
    .put<OrdreMission>( `http://localhost:3000/ordre_missions/${id}`,ordre);
  }
}
