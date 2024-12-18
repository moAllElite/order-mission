import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http:HttpClient) { }

  public getPayments():Observable<Paiement[]>{
    return this.http
    .get<Paiement[]> ('http://localhost:3000/payements');
  }
}
