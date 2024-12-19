import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  public Host: string='http://localhost:3000/';

  /**
   * get all employees data from db
   */

  public getPersonnals():Observable<Employee[]>{
    return this.http
      .get<Employee[]>(`${this.Host}personnels`);
  }


}
