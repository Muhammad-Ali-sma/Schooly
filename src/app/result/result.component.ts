import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Output() restartQuiz = new EventEmitter();
  @Input() progress: number = 0;
  @Input() runningTimer: number = 0;
  @Input() iconName: string = '';
  @Input() showSummaryPoints: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
