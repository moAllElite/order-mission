import { Injectable } from '@angular/core';

import { OrdreMission } from '../models/ordre-mission';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; 

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfMake: any;
    constructor(){}
    //load All Ressources
    async loadPdfMaker() {
      if (!this.pdfMake) {
        const pdfMakeModule = await import('pdfmake/build/pdfmake');
        const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
        this.pdfMake = pdfMakeModule.default;
        this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
      }
    }
   
 


    

    generateOrdreMissionPdf(ordreMission: any) {
      const documentDefinition = this.createDocumentDefinition(ordreMission);
      pdfMake.createPdf(documentDefinition).open(); // Peut également être .download() ou .print()
    }


    private createDocumentDefinition(ordreMission: OrdreMission):any {
      return {
        content: [
          { text: 'Ordre de Mission', style: 'header' },
        //  { text: `Numéro: ${ordreMission.numOdm}`, style: 'subheader' },
          { text: `Destination: ${ordreMission.destination}`, style: 'content' },
          { text: `Date début: ${ordreMission.dateDeb.toLocaleDateString()}` },
          { text: `Date fin: ${ordreMission.dateFin.toLocaleDateString()}` },
          { text: `Moyen de transport: ${ordreMission.moyenTransport}` },
          { text: `Salarié: ${ordreMission.salarie}` },
          { text: `Fonction: ${ordreMission.fonction}` },
          { text: `Direction: ${ordreMission.direction}` },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          content: {
            fontSize: 12,
            margin: [0, 5, 0, 5],
          },
        },
      };
    }



}
