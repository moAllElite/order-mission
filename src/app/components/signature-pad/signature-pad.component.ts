import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  inject, input,
  OnInit, output, OutputEmitterRef, signal,
  ViewChild, WritableSignal,
} from '@angular/core';
import SignaturePad, {PointGroup} from 'signature_pad';
import {MatDialog} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {outputFromObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signature-pad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signature-pad.component.html',
  imports: [
    NgIf,
    MatGridListModule,
  ],
  standalone: true,
  styleUrl: './signature-pad.component.css'
})
export class SignaturePadComponent  implements OnInit, AfterViewInit{
  canvas !:HTMLCanvasElement | null;
  readonly dialog:MatDialog = inject(MatDialog);
  randomNumber: number = Math.floor(Math.random() * 1000);
  // initialize canvas

  signatureNeeded!: boolean; //For validating the signature
  signaturePad!:SignaturePad;//it is used to create an instance of the SignaturePad

  ngOnInit(): void {

   this.canvas = document.querySelector("canvas");
    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas, {
        minWidth: 1,
        maxWidth: 1,
        dotSize:2
      });
    }
  }
  ngAfterViewInit(): void {
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }


  @ViewChild('canvas') canvasEl!: ElementRef;//It is used to obtain a reference to an HTML canvas element
  signatureImg:WritableSignal<string>= signal('');//To store the submitted signature as base64



  startDrawing(event: Event) {
    // works in device not in browser

  }
  moved(event: Event) {
    // works in device not in browser
  }
  public  imageOutput:OutputEmitterRef<string> =  output<string>();
  public image='';


 public savePad(event:Event){
  event.preventDefault();
    this.signatureImg.set( this.signaturePad.toDataURL());
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded ) {
      this.signatureNeeded = false;
      // Draws signature image from an array of point groups, without clearing your existing image (clear defaults to true if not provided)

      this.signatureImg.set( this.signaturePad.toDataURL('image/png'));
      this.image = this.signatureImg();
      this.imageOutput.emit(this.image);
     // return this.image;
    }
  }

  clearPad() {
    this.signaturePad.clear();
    this.image='';
  }
}
