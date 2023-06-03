import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-logout-confirmation-modal',
  templateUrl: './logout-confirmation-modal.component.html',
  styleUrls: ['./logout-confirmation-modal.component.css']
})
export class LogoutConfirmationModalComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  public url = parent.document.getElementById('logout_url') ? (<HTMLInputElement>parent.document.getElementById('logout_url')).value : "";
  constructor() { }

  ngOnInit(): void {
  }
  logout() {
    window.location.href = this.url
    this.cancel.emit();
  }

}
