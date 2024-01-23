// This class is a component for displaying information. Here's what each method does:

// close(): Clears the text and hides the component.
// open(): Retrieves text from the service and displays it in the component.

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

  /**
   * Closes the information box and sets the display status to false.
   */
  close() {
    this.informationBoxService.setText('');
    this.isDisplayed = false;
  }

  /**
   * Opens the information box and displays the text obtained from the information box service.
   */
  open() {
    this.informationBoxService.getText().subscribe((text) => {
      this.textToDisplay = text;
      this.isDisplayed = true;
    });
  }
}
