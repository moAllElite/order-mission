import { Component } from '@angular/core';
import { OrderMissionService } from '../../service/order-mission.service';
import { OrdreMission } from '../../models/ordre-mission';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card'; 
import { A11yModule } from '@angular/cdk/a11y';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 // PDF MAKE imports
import { PdfService } from '../../service/pdf.service';
 import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-download-order',
  standalone: false,
  
  templateUrl: './download-order.component.html',
  styleUrl: './download-order.component.css'
})
export class DownloadOrderComponent {
  constructor(protected pdfService: PdfService) {
  }
  
  async onGeneratePdf() {
    this.pdfService.generatePdf();
  }
  
}
