// This class is a component for displaying information. Here's what each method does:

// close(): Clears the text and hides the component.
// open(): Retrieves text from the service and displays it in the component.

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

  ngOnInit() {
    this.informationBoxService.getText().subscribe((text) => {
      this.textToDisplay = text;
    });
    this.informationBoxService.isDisplayed.subscribe((isDisplayed) => {
      this.isDisplayed = isDisplayed;
    });
  }

  closeInformationBox() {
    this.informationBoxService.close();
  }
}
