import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { OrderMissionService } from '../../services/order-mission.service';
import { ActivatedRoute } from '@angular/router';
import { OrdreMission } from '../../models/ordre-mission';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'app-order-misssion-detail',
  standalone: false,
  templateUrl: './order-misssion-detail.component.html',
  styleUrl: './order-misssion-detail.component.css'
})
export class OrderMisssionDetailComponent implements OnInit{
  constructor(private orderService:OrderMissionService,private route:ActivatedRoute){

  }
  order$:WritableSignal<Observable<OrdreMission[]> | null> = signal(null);
  numOdm :WritableSignal<string>=signal('');
  ngOnInit(): void {
   this.numOdm.set(this.route.snapshot.params['num_odm']);
    this.order$.set(this.orderService.getMissionOrderByOrderNumber(this.numOdm()));
  }

}
