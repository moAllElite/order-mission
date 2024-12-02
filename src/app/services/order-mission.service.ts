import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { OrdreMission } from '../models/ordre-mission';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderMissionService {

  public Host : string ='http://localhost:3000/';

  constructor(public http: HttpClient) { }
  // fetch all data from mission order

  //get all data from order mission

  public loadOrdersMissions() : Observable<OrdreMission[]>{
      return this.http
      .get<OrdreMission[]>(this.Host + 'ordre_missions');
  }

  // filter order mission by
  public getMissionOrderByOrderNumber(num_odm:string):Observable<OrdreMission[]>{
    return this.http.get<OrdreMission[]>(this.Host + `ordre_missions?num_odm=${num_odm}`);
  }
}
