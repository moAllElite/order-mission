import { Component, signal, WritableSignal } from '@angular/core';
import { OrderMissionService } from '../../service/order-mission.service';
import { OrdreMission } from '../../models/ordre-mission';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { A11yModule } from '@angular/cdk/a11y';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 // PDF MAKE imports
import { PdfService } from '../../service/pdf.service';
import { style } from '@angular/animations';

//pdf maker ressources
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-download-order',
  standalone: false,

  templateUrl: './download-order.component.html',
  styleUrl: './download-order.component.css'
})
export class DownloadOrderComponent {
  constructor(
    protected pdfService: PdfService,
    protected orderService:OrderMissionService
  ) {}
  order!:WritableSignal<OrdreMission>;
  doc:any;

  onGeneratePdf(){
   /* this.pdfService.generateMissionOrderOnPdf(
      'Mission Order',
      10,
      10
    );*/
  }

     //pdfMake.vfs = pdfFonts.pdfMake.vfs;

  //  generate a Mission Order's PDF following Order's number
  generateDocWithPDFMaker(numOdm: string){
    this.orderService.getMissionOrderByOrderNumber(numOdm)
    .subscribe(
      {
        next: (data) => { this.order?.set(data)}
      }
    );
    
    this.doc = this.getDocDocument(this.order());
    this.pdfService.generateMissionOrderWithPdfMaker(this.doc);
  }




  // get document infos base on mission order
  getDocDocument (ordre:OrdreMission) {
    return {
      content: [
        { text: 'ORDRE DE MISSION',style: 'header' },
        {
          columns:
            [
              {
                text:this.order()?.numOdm,
                style:{
                  fontSize: 16, bold: true, margin: [0, 0, 0, 10]
                }
              },
              {
                text:`Destination :${this.order()?.destination}`
              },
              {
                text:`Date de début :${this.order()?.dateDeb}`
              },
              {
                text:`Date de fin :${this.order()?.dateFin}`
              },
              {
                text:`Monsieur / Madame  :${this.order()?.salarie}`
              },
              {
                text:`Direction :${this.order()?.direction}`
              },
              {
                text:`Fonction :${this.order()?.fonction}`
              },
              {
                text: 'Signature',
                style:{
                  fontSize: 15,
                  italics:true
                }
              }
            ]
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10]  }
      }
    }

  }


   // get Mission's Order by order number
   getMissionOrder(numOdm:string){
    this.orderService.getMissionOrderByOrderNumber(numOdm)
    .subscribe(
      {
        next: (data) => { this.order.set(data)}
      }
    );
   return this.order;
  }
}
