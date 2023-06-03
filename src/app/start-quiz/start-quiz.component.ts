import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})

export class StartQuizComponent implements OnInit {
  @Output() handleOnPlayBtnClick = new EventEmitter();
  userData = {
    firstName: parent.document.getElementById('user_first_name') ? (<HTMLInputElement>parent.document.getElementById('user_first_name')).value : "",
    lastName: parent.document.getElementById('user_last_name') ? (<HTMLInputElement>parent.document.getElementById('user_last_name')).value : "",
  }
  constructor() { }

  ngOnInit(): void {
  }

}
