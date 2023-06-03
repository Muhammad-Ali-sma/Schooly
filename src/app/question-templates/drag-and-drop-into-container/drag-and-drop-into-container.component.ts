import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-drag-and-drop-into-container',
  templateUrl: './drag-and-drop-into-container.component.html',
  styleUrls: ['./drag-and-drop-into-container.component.css']
})
export class DragAndDropIntoContainerComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;
  @Output() setAnswer = new EventEmitter<any>();
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  constructor(private questionsService: QuestionsService) { }
  parentElement: any = null;
  ngOnInit(): void {
    this.parentElement = document.querySelector('.question');
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      setTimeout(() => {
        this.setAnswerCoordinates(this.question.data.answers);
      }, 500);
    })
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges) {
    // fix 1
    if (changes.question) {
      this.question.data.answers.filter((x: any) => {
        x.selected = false
        x.dragPosition = { x: 0, y: 0 };
      });
      this.setAnswerCoordinates(this.question.data.answers);
    }
  }

  setAnswerCoordinates(answers: any[]) {
    const bounds = document.getElementsByClassName('answers')[0].getBoundingClientRect();
    const answerBounds = document.getElementById('container-box')?.getBoundingClientRect();
    answers.forEach((answer: any) => {
      if(answer.selected){
        answer.x = Math.abs(Math.round(Math.random() * ((answerBounds?.width ?? 0))));
        answer.y = Math.abs(Math.round(Math.random() * ((answerBounds?.height ?? 0))));
        answer.dragPosition = { x: 0, y: 0 }
      } else {
        answer.x = Math.abs(Math.round(Math.random() * (bounds.width - 100)));
        answer.y = Math.abs(Math.round(Math.random() * (bounds.height - 100)));
      }

    });

  }

  drop(e: any) {
    const answer = e.source.data;
    const dropzoneElement = document.getElementById('container-box');
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
    if (this.questionVerified && answer.correct && answer.selected) return { 'background-color': 'green' };
    if (this.questionVerified && !answer.correct && answer.selected) return { 'background-color': 'red' };
    return { 'background-color': '', 'display': 'none' };
  }

  verifyQuestion() {
    var err = 0;
    var selectedAnswers = this.question.data.answers.filter((answer: any) => answer.selected);
    selectedAnswers.forEach((answer: any) => {
      if(!answer.correct){
        err++;
      }
    });
    return err == 0 && selectedAnswers.length > 0;
  }

  checkIfAnsweredCorrectly(answer: any) {
    return (answer.correct && answer.selected) || (answer.correct && !answer.selected);
  }
}
