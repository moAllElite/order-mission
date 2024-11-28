import { Injectable } from '@angular/core';
import {jsPDF} from 'jspdf';
import { OrdreMission } from '../models/ordre-mission';
import {OrderMissionService } from '../service/order-mission.service';
//PDF MAKER Ressources
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
//import { PdfmakeModule } from 'ng-pdf-make';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
    counter:number = 0;
    constructor(){}


    // generate a PDF WITH JSPDF

    /*
    generateMissionOrderOnPdf(content:string ,marginX:number, marginY:number){
      const doc = new jsPDF(); // initialize new doc
      doc.text(content,marginX,marginX); // set content & margin

      doc.save('order-mission.pdf');// save doc
    }*/


 


    generateMissionOrderWithPdfMaker(document:any){
   //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(document).open();
    }



}
