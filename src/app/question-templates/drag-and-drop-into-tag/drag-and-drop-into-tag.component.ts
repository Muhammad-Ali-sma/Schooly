import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-drag-and-drop-into-tag',
  templateUrl: './drag-and-drop-into-tag.component.html',
  styleUrls: ['./drag-and-drop-into-tag.component.css']
})
export class DragAndDropIntoTagComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {

    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.question.data.answers.filter((x: any) => x.selected = false);
      this.setObjectCoordinates(this.question.data.objects.inside, 'inside-objects');
      this.setObjectCoordinates(this.question.data.objects.outside, 'outside-objects');
    }
  }

  randomNumber(min:number, max:number) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 

  setObjectCoordinates(objects: any[], area: string) {
    const bounds = document.getElementsByClassName(area)[0].getBoundingClientRect();
    objects.forEach((object: any) => {
      object.x = this.randomNumber(50, bounds.width-70);
      object.y = this.randomNumber(50, bounds.height-70);
    });

  }

  verifyQuestion() {
    let correct = true;
    this.question.data.answers.forEach((answer: any) => {
      if (!((answer.correct && answer.selected) || (!answer.correct && !answer.selected))) correct = false;
    });
    return correct;
  }

  drop(e: any) {
    const answer = e.source.data;
    const dropzoneElement = document.getElementById('tag-image');
    const isDroppedInside = this.isObjectDroppedInZone(e.source.element.nativeElement, dropzoneElement);

    answer.selected = isDroppedInside;
  }

  isObjectDroppedInZone(object: any, zone: any) {
    const objectBounds = object.getBoundingClientRect();
    const dropzoneBounds = zone.getBoundingClientRect();

    const dropZoneCenterX = dropzoneBounds.x + (dropzoneBounds.width / 2);
    const dropZoneCenterY = dropzoneBounds.y + (dropzoneBounds.height / 2);
    const dropZoneRadius = dropzoneBounds.width / 2;

    const x = objectBounds.x;
    const y = objectBounds.y;

    return Math.sqrt(Math.pow(dropZoneCenterX - (x + (objectBounds.width / 2)), 2) + Math.pow(dropZoneCenterY - (y + (objectBounds.height / 2)), 2)) <= dropZoneRadius;
  }

  setAnswerStyle(answer: any) {
    if (this.questionVerified && answer.correct) return { 'background-color': 'green' };
    if (this.questionVerified && !answer.correct && answer.selected) return { 'background-color': 'red' };
    return { 'background-color': '', 'display': 'none' };
  }

  checkIfAnsweredCorrectly(answer: any) {
    return (answer.correct && answer.selected) || (!answer.correct && !answer.selected);
  }
}
