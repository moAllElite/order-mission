import {Component, computed, Inject, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import { Employee } from '../../models/employee';
import {map, startWith} from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable } from 'rxjs';
import {OrdreMission} from '../../models/ordre-mission';
import {OrderMissionService} from '../../services/order-mission.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../widgets/snack-bar/snack-bar.component';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-mission-order',
  standalone: false,
  templateUrl: './new-mission-order.component.html',
  styleUrl: './new-mission-order.component.css'
})
export class NewMissionOrderComponent implements OnInit {
  isLinear:WritableSignal<boolean> = signal(false);
  constructor(
    protected employeeService:EmployeeService,
    private  orderService:OrderMissionService,
    private router:Router,
  ){} // inject employee service
  matricule:string='';
  currentUnity:WritableSignal<string> = signal('')
  currentDirection : WritableSignal<string> = signal('');
  currentFunction: WritableSignal<string> = signal('');

  matriculeControl = new FormControl<string | Employee>('');
  serviceControl = new FormControl<string | Employee>('');
  unityControl:FormControl =  new FormControl<string | Employee>('',[Validators.required]);
  directionControl:FormControl = new FormControl<string | Employee>('',[Validators.required]);
  functionControl:FormControl = new FormControl<string | Employee>('',[Validators.required]);
  nameControl:FormControl = new FormControl<string | Employee>('',[Validators.required]);


  public _formBuilder = inject(FormBuilder);


  numOdmControl:FormControl<string | null> = new FormControl('');
  formGroup:FormGroup =  this._formBuilder.group(
    ({
      salarie: this.matriculeControl,
      num_odm: this.numOdmControl,
      objet_mission: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      date_deb: new FormControl<Date | null>(null, [Validators.required]),
      date_fin: new FormControl<Date | null>(null, [Validators.required]),
      itineraire: new FormControl('', [Validators.required]),
      moyen_transport: new FormControl('', [Validators.required]),
      statut: new FormControl('En attente', [Validators.required]),
    }  ));
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
  currentService:WritableSignal<string>= signal('');
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
          this.currentService.set(result.service);
          this.serviceControl.setValue(this.currentService())
          this.directionControl.setValue(this.currentDirection());
          this.functionControl.setValue(this.currentFunction().toUpperCase());
          this.unityControl.setValue( this.currentUnity());
          this.nameControl.setValue(result.nom_complet);
        }

        return isPresent;
      }
    );


  }

  //display matricule
  displayFn(user: Employee): string {
    return user && user.matricule ? user.matricule : '';
  }

  // show snack bar

  protected _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;
  showSnackBar :WritableSignal<boolean> = signal(false);

  message:string='';
  openSnackBar() {
    this.message ="Demande de mission enregistrée avec succès !!!";
    this.showSnackBar.set(true);
    this._snackBar.openFromComponent(SnackBarComponent,{
      data:this.message,
      duration: this.durationInSeconds * 350,
    });

  }

  order:WritableSignal<OrdreMission | null> = signal(null) ;

  // save new order mission
  onSubmit() {
    console.log(this.formGroup.value);
    // Vérifiez que le numéro ODM est bien généré

    const  result = this.formGroup.value;
    this.numOdmControl.setValue(this.currentOdm());
    this.formGroup.controls['num_odm'].setValue(this.currentOdm());
    this.order.set(this.formGroup.value);
    if (this.formGroup.valid) {
      this.orderService.saveMissionOrder(this.order()).subscribe({
        next: (value) => {
          this.openSnackBar();
          this.formGroup.reset(); // reset the form after submit
          this.router.navigateByUrl('/orders');
        },
        error: (err) => alert(err)
      });
    } else {
      alert('Form is invalid'+ this.formGroup.errors);
    }

  }

  currentOdm:WritableSignal<string> =signal('');

  //generate a mission order number
  public setOdmNumber( ) {

    const value:Date =this.formGroup.controls['date_deb'].value;
    const  random = Math.floor(Math.random() * 10000);
    const result:string=value.getMonth().toLocaleString();

    this.currentOdm.set(random+'-'+value.getMonth().toLocaleString()+'-'+value.getFullYear());
    console.log(this.currentOdm())
  }
}
