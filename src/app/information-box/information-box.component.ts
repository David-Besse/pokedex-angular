// This class is a component for displaying information.

import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { InformationBoxService } from './service/information-box.service';

@Component({
  selector: 'app-information-box',
  standalone: true,
  imports: [NgIf],
  templateUrl: './information-box.component.html',
  styleUrl: './information-box.component.scss',
})
export class InformationBoxComponent implements OnInit {
  textToDisplay: string;
  isDisplayed: boolean;

  constructor(private informationBoxService: InformationBoxService) {}

  /**
   * Initializes the component with text and display status from the information box service.
   */
  ngOnInit() {
    this.informationBoxService.getText().subscribe((text) => {
      this.textToDisplay = text;
    });
    this.informationBoxService.isDisplayed.subscribe((isDisplayed) => {
      this.isDisplayed = isDisplayed;
    });
  }

  /**
   * Closes the information box.
   *
   */
  closeInformationBox() {
    this.informationBoxService.close();
  }
}
