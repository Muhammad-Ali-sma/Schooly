import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import helper from 'src/app/helper';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-multiple-choice-text-or-image-select',
  templateUrl: './multiple-choice-text-or-image-select.component.html',
  styleUrls: ['./multiple-choice-text-or-image-select.component.css']
})
export class MultipleChoiceTextOrImageSelectComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.question.data.answers.filter((x: any) => x.selected = false);
    }
  }

  verifyQuestion() {
    let correct = true;
    this.question.data.answers.forEach((answer: any) => {
      if (!((answer.correct && answer.selected) || (!answer.correct && !answer.selected))) correct = false;
    });
    return correct;
  }

  selectAnswer(answer: any) {
    helper.selectAnswer(answer);
  }

  setAnswerStyle(answer: any) {
    if (this.questionVerified && answer.correct) return { 'background-color': 'green' };
    if (this.questionVerified && !answer.correct && answer.selected) return { 'background-color': 'red' };
    return { 'background-color': '', 'display': 'none' };
  }

  checkIfAnsweredCorrectly(answer: any) {
    return (answer.correct && answer.selected) || (!answer.correct && !answer.selected);
  }

  getImageSize() {
    switch(this.question.data.imageSize) {
      case 'small':
        return '100px';
      case 'medium':
        return '250px';
      case 'large':
        return '400px';
      default:
        return '250px';
    }
  }
}
