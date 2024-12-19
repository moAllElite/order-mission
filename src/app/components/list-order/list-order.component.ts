import {Component, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {PdfService} from '../../services/pdf.service';
import {OrderMissionService} from '../../services/order-mission.service';
import {OrdreMission} from '../../models/ordre-mission';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-order',
  standalone: false,

  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit {

  constructor(public orderService: OrderMissionService,
    private route:Router
    , public pdfService: PdfService,){}

  // params for tables
  orders:WritableSignal<OrdreMission[] >= signal([]) ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  startDate: Date | null = null;
  endDate: Date | null = null;


  public dataSource:any ;
  public order! :OrdreMission[];
  public displayedColumns :string[]= ['id',  'numOdm' ,'date_deb','date_fin',
   'salarie' , 'statut'  , 'matricule','telecharger','detail'
  ];



  // assign the orders list to the table on page Init
  ngOnInit(): void {
    this.orderService.loadOrdersMissions().subscribe(
      (data:OrdreMission[]) => {
        this.orders.set(data);
        // inject list orders on datasource
        this.dataSource = new  MatTableDataSource(this.orders());
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

  }


  // Filter orders by
  filterOrders(event: Event) {
      // zone de texte de type   HTMLInputElement
    this.dataSource.filter = (event.target as HTMLInputElement).value;
  }

  // filter by debut & end date
  // Handle start date change
  onStartDateChange(event: any): void {
    this.startDate = event.value;
    this.applyDateFilter();
  }
   // Handle end date change
   onEndDateChange(event: any): void {
    this.endDate = event.value;
    this.applyDateFilter();
  }

  // Apply date filter logic date
  applyDateFilter(): void {
    if (!this.startDate && !this.endDate) {
      this.dataSource.data = this.orders; // Reset to original data
      return;
    }

    this.dataSource.data = this.orders().filter((order) => {
      //convert to date 
      const orderDateDeb = new Date(order.date_deb);
      const orderDateFin = new Date(order.date_fin);

      // Filter logic
      if (this.startDate && this.endDate) {
        return orderDateDeb >= this.startDate && orderDateFin <= this.endDate;
      } else if (this.startDate) {
        return orderDateDeb >= this.startDate;
      } else if (this.endDate) {
        return orderDateFin <= this.endDate;
      }
      return true;
    });
  }
  //  generate a this.orders Order's PDF following Order's number
  public generateDocWithPDFMaker(num:any){
    //console.log(num)
    this.orderService.getMissionOrderByOrderNumber(num)
    .subscribe(
      {
        next : (data:OrdreMission[])=>{
          this.order = data;
        setTimeout(
          () => {
            this.pdfService.generatePDF(this.order)
          },200
        )
        },
      }

    );
       this.route.navigateByUrl('orders');
    }


}
