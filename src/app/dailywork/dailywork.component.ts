import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dailywork',
  templateUrl: './dailywork.component.html',
  styleUrls: ['./dailywork.component.css']
})
export class DailyworkComponent implements OnInit {
  @Output() handleOnTaskSelect = new EventEmitter<string>();
  @Input() hasCompletedDailyWork: boolean = false;
  @Input() hasCompletedMathAssignment: boolean = false;
  @Input() hasCompletedSpellingAssignment: boolean = false;
  showPopup: boolean = false;
  message: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  handlePopup(value = false, info: string) {
    this.showPopup = value;
    this.message = info;
  }
}
