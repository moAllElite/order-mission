import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit, signal,
  ViewChild, WritableSignal,
} from '@angular/core';
import SignaturePad, {PointGroup} from 'signature_pad';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-signature-pad',

  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signature-pad.component.html',
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
        minWidth: 5,
        maxWidth: 10,
        penColor: "rgb(66, 133, 244)"
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





 public savePad():void {
    this.signatureImg .set( this.signaturePad.toDataURL());
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded ) {
      this.signatureNeeded = false;

      this.signatureImg.set( this.signaturePad.toDataURL('image/png'));

      // 1- Get secure URL from our server
      // 2- POST the image directly to the s3 bucket
      // 3-post request to server store extrat data

      // Optionally: Send the signature image to the server or perform other actions
      this.downloadSignature(this.signatureImg()); // Trigger download
    }
  }
  // Function to download the signature as an image
  downloadSignature(data: string) {
    const a = document.createElement('a');
    a.href = data;
    a.download =  `signature-${this.randomNumber}.png`; // File name for download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  clearPad() {
    this.signaturePad.clear();
  }
}
