import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-mood',
  templateUrl: './select-mood.component.html',
  styleUrls: ['./select-mood.component.css']
})
export class SelectMoodComponent implements OnInit {
  @Output() selectMood = new EventEmitter<string>();
  @Output() handleOnMoodStartClick = new EventEmitter();
  @Input() mood: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
