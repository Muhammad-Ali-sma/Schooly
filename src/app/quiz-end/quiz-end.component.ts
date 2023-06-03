import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.css']
})
export class QuizEndComponent implements OnInit {
  @Output() handleOnNoBtnClick = new EventEmitter();
  @Output() oneMoreChance = new EventEmitter();
  @Input() haveOneMoreChance: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
