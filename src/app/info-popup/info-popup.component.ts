import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.css']
})
export class InfoPopupComponent implements OnInit {
  @Input() message: string = ''
  @Output() closePopup = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
