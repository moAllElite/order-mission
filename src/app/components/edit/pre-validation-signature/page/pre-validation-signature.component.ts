import {AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, inject, OnInit, Output, signal, ViewChild, WritableSignal} from '@angular/core';
import {OrdreMission, Statut} from '../../../../models/ordre-mission';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderMissionService} from '../../../../services/order-mission.service';
import {map} from 'rxjs/operators';
import { AwsService } from '../../../../services/aws-authentication.service';
import * as fs from 'fs';
import { Base64 } from 'js-base64';
import SignaturePad from 'signature_pad';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../widgets/snack-bar/snack-bar.component';
@Component({
  selector       : 'app-pre-validation-signature',
  standalone     : false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './pre-validation-signature.component.html',
  styleUrl       : './pre-validation-signature.component.css'
})
export class PreValidationSignatureComponent implements OnInit ,AfterViewInit{

  public       numOdm: WritableSignal<string>             = signal('');
  public       odmNumber                                  = '';
  currentOrder: WritableSignal<OrdreMission |null>        = signal(null);
  public       ordre: WritableSignal<OrdreMission | null> = signal(null);
  public       isSpinning :WritableSignal<string>         = signal('none');
  form: FormGroup;

  canvas   !           : HTMLCanvasElement | null;
  readonly dialog      : MatDialog = inject(MatDialog);
           randomNumber: number = Math.floor(Math.random() * 1000);
      // initialize canvas

    signatureNeeded!: boolean;       //For validating the signature
    signaturePad!   : SignaturePad;  //it is used to create an instance of the SignaturePad
    showPrevalidButton = false; // Flag to show Prevalid button


  constructor(
    private   route       : ActivatedRoute,
    public    ordreService: OrderMissionService,
    public    fb          : FormBuilder,
    protected awsService  : AwsService,
    private router:Router
  ) {
    this.form = this.fb.group({
      salarie        : new FormControl('', ),
      id             : new FormControl(null, ),
      objet_mission  : new FormControl('', ),
      destination    : new FormControl('', ),
      num_odm        : new FormControl(''),
      date_deb       : new FormControl(null, ),
      date_fin       : new FormControl(null, ),
      itineraire     : new FormControl('', ),
      moyen_transport: new FormControl('', ),
      statut         : new FormControl('', ),
      pre_valid      : new FormControl('', ),
      valid          : new FormControl('', )
    });
  }

  showSnackBar : WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.checkRoute();//check for route and
    this.numOdm.set(this.route.snapshot.params['num_odm']);
    this.odmNumber = this.numOdm();
    this.form.controls['num_odm'].setValue(this.numOdm());
    this.getCurrentMissionOrder();
    this.getUrlBucket();
      //launch signature pad
    this.canvas = document.querySelector("canvas");
    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas, {
        minWidth: 1,
        maxWidth: 1,
        dotSize : 2
      });
    }
  }


  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }


@ViewChild('canvas') canvasEl!: ElementRef;                          //It is used to obtain a reference to an HTML canvas element
           signatureImg       : WritableSignal<string>= signal('');  //To store the submitted signature as base64
    // Check current route to determine which buttons to show
    private checkRoute(): void {console.log(this.router.url);
      console.log();
      const road =this.router.url.split('/').includes('pre-valid');
      if(road){
        this.showPrevalidButton = true;
      }
    }


  public async getCurrentMissionOrder() {
    return this.ordreService.loadOrdersMissions()
      .pipe(
        map((orders: OrdreMission[]) => {
          const matchingOrder = orders.find(order => order.num_odm === this.numOdm());
          if (matchingOrder) {
            this.currentOrder.set(matchingOrder);
            this.ordre.set(matchingOrder);
          }
        })
      ).subscribe();
  }

  async assignValuesToForm(
    order: OrdreMission | null,
    status:Statut,imagePrevalid:string | undefined,
    imageValid:string
  ) {
    this.form.controls['pre_valid'].setValue(imagePrevalid);
    this.form.controls['salarie'].setValue(order?.salarie);
    this.form.controls['id'].setValue(order?.id);
    this.form.controls['moyen_transport'].setValue(order?.moyen_transport);
    this.form.controls['objet_mission'].setValue(order?.objet_mission);
    this.form.controls['destination'].setValue(order?.destination);
    this.form.controls['itineraire'].setValue(order?.itineraire);
    this.form.controls['date_fin'].setValue(order?.date_fin);
    this.form.controls['date_deb'].setValue(order?.date_deb);
    this.form.controls['valid'].setValue(imageValid);
    this.form.controls['statut'].setValue(status)
  }


    // 1- Get secure URL from our server
  public async getUrlBucket( ){

    const url = this.awsService.getSecureUrl();
  }

    // 2- POST the image directly to the s3 bucket
  public async saveSignatureToS3Bucket(image:string):Promise<string >{
    return await this.awsService.postSignatureToAws(image);
  }



  public  imageUrlFromS3:WritableSignal<any> = signal('');
  message:WritableSignal<string>    = signal<string >('');
    // on pre validation status change and signature image assigned
  icon = signal<string>('');

  // update the mission order after submit
  public async onSubmitPrevalid() {
    setTimeout(async()=>{
     // const url = await this.saveSignatureToS3Bucket(this.signatureImg());
      //this. imageUrlFromS3.set(url ); // upload image on the AWS S3 Bucket
      console.log(this.signatureImg());
     this.assignValuesToForm(this.ordre(),Statut.Prevalider,this.signatureImg(),'');
      console.log(this.form.value)
      if (this.form.valid) {
        this.icon.set('check_circle');
          const c_ordre :OrdreMission = this.form.value;
                  //console.log(this.form.value)
          this.ordreService.preValidateMission(this.form.controls['id'].value,c_ordre)
          .subscribe();
          this.clearPad();
          this.message.set('Pré validation effecuter avec success');
          this.openSnackBar('/orders');
      }
    },1000)
  }



  // update the mission order after submit
  public async onSubmitValid() {
    setTimeout(async()=>{
      console.log(this.signatureImg());
     this.assignValuesToForm(this.ordre(),Statut.Valider,this.ordre()?.pre_valid,this.signatureImg());
      console.log(this.form.value)
      if (this.form.valid) {
        this.icon.set('check_circle');
          const c_ordre :OrdreMission = this.form.value;
          this.ordreService.preValidateMission(this.form.controls['id'].value,c_ordre)
          .subscribe();
          this.clearPad();
          this.message.set('Validation de la mission effecutée avec success');
          this.openSnackBar('/orders');
      }
    },1000)
  }


  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;

  // we show snack back for alert
  openSnackBar(road:string) {
    this.showSnackBar.set(true);
    this._snackBar.openFromComponent(SnackBarComponent,{
      data:this.message(),
      duration: this.durationInSeconds * 450,
    });
    this.router.navigateByUrl(road);
  }




  onReject() {
    this.assignValuesToForm(this.ordre(),Statut.Rejeter,'','');
    console.log(this.form.value)
    const c_ordre :OrdreMission = this.form.value;
    this.ordreService.preValidateMission(this.form.controls['id'].value,c_ordre)
      .subscribe({
        next : ()=> { console.log(this.form.value)},
        error: (err)=> console.log(err)
      })
    this.message.set('Ordre de mission rejetée !!!');
    this.openSnackBar('/orders');
    this.icon.set('cancel');

  }



    // clear pead
  clearPad() {
    this.signaturePad.clear();
    this.signatureImg.set('');
  }

  public getPad(event:Event){
    event.preventDefault();
      this.signatureImg.set( this.signaturePad.toDataURL());
      this.signatureNeeded = this.signaturePad.isEmpty();
      if (!this.signatureNeeded ) {
        this.signatureNeeded = false;
          // Draws signature image from an array of point groups, without clearing your existing image (clear defaults to true if not provided)
        this.signatureImg.set( this.signaturePad.toDataURL('image/png'));
      }
    }

}
