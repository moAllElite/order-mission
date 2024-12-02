import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Employee } from '../../models/employee';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-new-mission-order',
  standalone: false,

  templateUrl: './new-mission-order.component.html',
  styleUrl: './new-mission-order.component.css'
})
export class NewMissionOrderComponent implements OnInit {

  constructor(protected employeeService:EmployeeService){} // inject employee service

  currentMatricule:WritableSignal<string> = signal('');

  agentsInfo!:WritableSignal<Employee>;
  datedebpicker!:WritableSignal<Date> ;
  datefinpicker!:WritableSignal<Date> ;
  matricule:string='';
  currentUnity:WritableSignal<string> = signal('')
  currentDirection : WritableSignal<string> = signal('');
  currentFunction: WritableSignal<string> = signal('');

  matriculeControl = new FormControl<string | Employee>('');

  unityControl =  new FormControl<string | Employee>('');
  directionControl = new FormControl<string | Employee>('');
  functionControl = new FormControl<string | Employee>('');
  unity!:Signal<any>;
  formGroup = new FormGroup(
    {
      matricule:this.matriculeControl,
      destination: new FormControl(''),
      itineaire: new FormControl(''),
      datedeb:new FormControl(''),
      datefin: new FormControl(''),
      unite: this.unityControl,
      fontion:this.functionControl,
      direction:this.directionControl,
      objetMission:new FormControl('')
    }
  );
  //for autocomplete matricule
  options:WritableSignal<Employee[]>=signal([]);
  filteredOptions!: Observable<Employee[]>;
  //load all matricule from Personnal list on Initialize
  ngOnInit(): void {
    this.employeeService.getPersonnals()
      .subscribe((data:Employee[]) => {
        this.options.set(data);
        this.filteredOptions = this.matriculeControl.valueChanges.pipe(
          startWith(''),
          map(value => {

            const currentMatri  = typeof value === 'string' ? value : value?.matricule;
            return currentMatri  ? this._filter(currentMatri)
              : this.options().slice()

          })
        );

      })
  }

  // get infos matricule, function ,direction  base user inputed
  private _filter(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.options().filter(
      option => {
        const isPresent:boolean = option.matricule.toUpperCase().includes(filterValue);
        let result = this.options()
          .find((word) => word.matricule === value )
        if(result){
          this.currentUnity.set( result.unite);
          this.currentDirection.set(result.direction);
          this.currentFunction.set(result.fonction);
          this.directionControl.setValue(this.currentDirection());
          this.functionControl.setValue(this.currentFunction().toUpperCase());
          this.unityControl.setValue( this.currentUnity());
        }

        return isPresent;
      }
    );


  }

  //display matricule
  displayFn(user: Employee): string {
    return user && user.matricule ? user.matricule : '';
  }

  /**on matricule field loose focus we load employee informations
   *  @return Unity
   *  @return function
   *  @return Direction
   * */



  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formGroup.value);
  }





}
