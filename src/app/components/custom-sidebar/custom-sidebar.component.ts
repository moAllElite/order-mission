import {Component, computed, Input, input, Signal, signal, WritableSignal} from '@angular/core';
export type  MenuItem = {
  icon:string;
  label:string;
  route:string;
}
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
      {
        icon: 'library_add',
        label: 'Liste des mission',
        route: '/orders'
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
