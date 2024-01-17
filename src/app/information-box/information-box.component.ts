import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserStorageService } from '../browser-storage.service';

@Component({
  selector: 'app-information-box',
  standalone: true,
  imports: [NgIf],
  templateUrl: './information-box.component.html',
  styleUrl: './information-box.component.scss',
})
export class InformationBoxComponent implements OnInit {
  isShown: string;

  constructor(private browerStorage: BrowserStorageService) {}

  ngOnInit() {
    this.isShown =
      this.browerStorage.get('informationBox') === 'false' ? 'false' : 'true';
  }

  close() {
    const informationBox = document.getElementById('information-box');
    informationBox?.remove();
    this.browerStorage.set('informationBox', 'false');
    this.isShown = 'false';
  }
}
