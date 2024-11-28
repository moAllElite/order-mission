import { AfterViewInit, Component, input, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { OrderMissionService } from '../../service/order-mission.service';
import { OrdreMission } from '../../models/ordre-mission';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort,MatSortHeader } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-list-order',
  standalone: false,
  
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit {

  constructor(protected orderService: OrderMissionService){}
  
  // params for tables
  orders:WritableSignal<OrdreMission[] >= signal([]) ;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

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
        this.dataSource.sort = this.sort;
      }
    );
     
  }


  // Filter orders by
  filterOrders(event: Event) {
     let value = (event.target as HTMLInputElement ) .value; // zone de texte de type   HTMLInputElement
      this.dataSource.filter = value;
  }
   


}
