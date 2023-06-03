import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-repeat-pattern',
  templateUrl: './repeat-pattern.component.html',
  styleUrls: ['./repeat-pattern.component.css']
})
export class RepeatPatternComponent implements OnInit {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.question.data.pattern = this.question.data.pattern.map((row: any[]) => {
        return row.map((cell: any) => {
          return { color: cell, selectedColorIndex: null };
        });
      });
    }
  }

  verifyQuestion() {
    let correct = true;
    this.question.data.pattern.forEach((row: any[]) => {
      row.forEach((cell: any) => {
        if (cell.color !== cell.selectedColorIndex) correct = false;
      });
    });
    return correct;
  }

  changeCellColor(cell: any) {
    if (cell?.selectedColorIndex === null) {
      cell.selectedColorIndex = 0;
    } else if (cell?.selectedColorIndex === this.question.data.colors.length - 1) {
      cell.selectedColorIndex = null;
    } else {
      cell.selectedColorIndex++;
    }
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
