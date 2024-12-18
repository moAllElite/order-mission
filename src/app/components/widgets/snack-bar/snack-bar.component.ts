import { Component, Inject, inject, input, InputSignal } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports:[MatFormFieldModule, MatSnackBarModule
    ,FormsModule, MatInputModule, MatButtonModule,MatIconModule],

  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {
  constructor(readonly router:Router,
    @Inject(MAT_SNACK_BAR_DATA) public message: string, // Injecting data
  ){}

  navigeToListOrder() {
     this.router.navigateByUrl('/orders');
  }
}
