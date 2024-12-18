import {ChangeDetectionStrategy, Component, input, Input, InputSignal, signal, WritableSignal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {OrdreMission} from '../../../models/ordre-mission';
@Component({
  selector: 'app-expansion',
  standalone: false,
  templateUrl: './expansion.component.html',
  styleUrl: './expansion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionComponent {
  step:WritableSignal<number> = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }

  ordreMission :InputSignal<OrdreMission> = input.required();
}
