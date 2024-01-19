import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserStorageService } from '../browser-storage.service';
import { InformationBoxService } from './service/information-box.service';

@Component({
  selector: 'app-information-box',
  standalone: true,
  imports: [NgIf],
  templateUrl: './information-box.component.html',
  styleUrl: './information-box.component.scss',
})
export class InformationBoxComponent implements OnInit {
  @Input() textToDisplay: string;
  isBoxDisplayed: boolean;

  constructor(
    private browserStorage: BrowserStorageService,
    private informationBoxService: InformationBoxService
  ) {}

  ngOnInit() {
    this.informationBoxService.getText().subscribe((text) => {
      this.textToDisplay = text;
    });
    this.isBoxDisplayed = this.informationBoxService.toggleInformationBox;
  }

  close() {
    this.browserStorage.set('informationBox_cookie', 'false');
    this.isBoxDisplayed = false;
    this.informationBoxService.setText('');
  }
}
