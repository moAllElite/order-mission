import {Component, computed, signal, WritableSignal} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'order-mission';

  collapsed:WritableSignal<boolean> = signal(false); // burger button state manager

  sideNavWidth = computed(() => this.collapsed() ? '75px':'250px');
}
