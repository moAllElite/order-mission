import { Component, input, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { OrderMissionService } from '../../service/order-mission.service';
import { OrdreMission } from '../../models/ordre-mission';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-list-order',
  standalone: false,
  
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit{
  constructor(protected orderService: OrderMissionService){}
  
  // params for tables
  orders:WritableSignal<OrdreMission[] >= signal([]) ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource:any ;

  public displayedColumns :string[]= [  'id',  'numOdm','destination','dateDeb',    
  'dateFin' ,    'moyenTransport' ,    'salarie' , 'fonction'  , 'direction','telecharger'
  ];
  
  // assign the orders list to the table on page Init
  ngOnInit(): void {
    this.orderService.loadOrdersMissions().subscribe(
      (data:OrdreMission[]) => {
        this.orders.set(data);
        // inject list orders on datasource
        this.dataSource = new  MatTableDataSource(this.orders());
        this.dataSource.paginator = this.paginator;
     
      }
    );
    console.log(this.orders())
    
    console.log(this.dataSource)

  }

   

}
