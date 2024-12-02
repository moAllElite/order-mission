import {Component, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {PdfService} from '../../services/pdf.service';
import {OrderMissionService} from '../../services/order-mission.service';
import {OrdreMission} from '../../models/ordre-mission';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-list-order',
  standalone: false,

  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit {

  constructor(public orderService: OrderMissionService, public pdfService: PdfService,){}

  // params for tables
  orders:WritableSignal<OrdreMission[] >= signal([]) ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource:any ;
  public order! :OrdreMission[];
  public displayedColumns :string[]= [  'id',  'numOdm','destination','date_deb',
  'date_fin' ,    'moyen_transport' ,    'salarie' , 'statut'  , 'matricule','telecharger'
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

    )


    }


}
