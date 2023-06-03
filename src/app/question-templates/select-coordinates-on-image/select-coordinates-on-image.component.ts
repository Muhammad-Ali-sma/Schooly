import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-select-coordinates-on-image',
  templateUrl: './select-coordinates-on-image.component.html',
  styleUrls: ['./select-coordinates-on-image.component.css']
})
export class SelectCoordinatesOnImageComponent implements OnInit {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
  }

  verifyQuestion() {
    let correct = true;
    this.question.data.coordinates.forEach((c: any) => {
      if (!((c.correct && c.selected) || (!c.correct && !c.selected))) correct = false;
    });
    return correct;
  }

  selectCoordinate(coordinate: any) {
    coordinate.selected = !coordinate.selected;
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
