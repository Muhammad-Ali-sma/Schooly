import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() iconName: string = 'fa fa-star';

  constructor() { }

  ngOnInit(): void {
  }

}
