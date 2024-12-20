import {Component, computed, Input, Signal, signal, WritableSignal} from '@angular/core';
import { MatListModule } from '@angular/material/list';
export type MenuItem ={
  icon:string;
  label:string;
  route:string;
}
export type OrderNode = {
  name: string;
  icon:string;
  route?:string;
  children?: OrderNode[];
}
const menus :OrderNode[] =[
  {icon:'add_circle',name: 'Demander une mission',route:'/new-order-mission'},
  {icon:'add_circle',name: 'Liste des ordres',route:'/orders'}
]
const TREE_DATA: OrderNode[] = [
  {
    name: 'Ordre de mission',
    icon: 'library_add',
    children: menus,
  }

];

@Component({
  selector: 'app-custom-sidebar',
  standalone: false,
  templateUrl: './custom-sidebar.component.html',
  styleUrl: './custom-sidebar.component.css'
})
export class CustomSidebarComponent {

  menuItem: WritableSignal<MenuItem[]> = signal<MenuItem[]>(
    [
      {
        icon: 'dashboard',
        label: 'Tableau de bord',
        route: ''
      },
      {
        icon: 'analytics',
        label: 'Analyse',
        route: '/analytics'
      },

    ]
  )


  // set collapse value on burger button pressed
  sideNavCollapsed: WritableSignal<boolean> = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize: Signal<string> = computed((): string => this.sideNavCollapsed() ? '32' : '100');

}
