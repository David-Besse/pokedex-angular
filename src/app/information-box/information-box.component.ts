import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { InformationBoxService } from './service/information-box.service';

@Component({
  selector: 'app-information-box',
  standalone: true,
  imports: [NgIf],
  templateUrl: './information-box.component.html',
  styleUrl: './information-box.component.scss',
})
export class InformationBoxComponent {
  @Input() textToDisplay: string;
  isDisplayed: boolean = false;

  constructor(private informationBoxService: InformationBoxService) {}

  close() {
    this.informationBoxService.setText('');
    this.isDisplayed = false;
  }

  open() {
    this.informationBoxService.getText().subscribe((text) => {
      this.textToDisplay = text;
      this.isDisplayed = true;
    });
  }
}
