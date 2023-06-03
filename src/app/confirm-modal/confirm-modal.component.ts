import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Output() cancel = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
