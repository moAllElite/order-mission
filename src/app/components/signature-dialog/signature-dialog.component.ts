import {ChangeDetectionStrategy, Component, inject, Inject, Input} from '@angular/core';
import SignaturePad from 'signature_pad';
import {SignaturePadComponent} from '../signature-pad/signature-pad.component';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions, MatDialogClose, MatDialogContent,
  MatDialogModule, MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-singature-dialog',
  templateUrl: './signature-dialog.component.html',
  standalone: true,
  styleUrl: './signature-dialog.component.css',
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle]
})
export class SignatureDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SignatureDialogComponent>);
  readonly data = inject<SignaturePad>(MAT_DIALOG_DATA);
  readonly dialog:MatDialog = inject(MatDialog);

  signaturePad = inject<SignaturePadComponent>(MAT_DIALOG_DATA)
 // readonly anim = model(this.data.animal);
  constructor(service:SignaturePadComponent) {
  }
  save(){
    const dialogRef = this.dialog.open(SignatureDialogComponent, {restoreFocus: false});
    this.signaturePad.savePad()
    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.dialog.closeAll());
  }

}
