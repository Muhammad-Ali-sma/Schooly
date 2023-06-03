import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-select-among-all',
  templateUrl: './select-among-all.component.html',
  styleUrls: ['./select-among-all.component.css']
})
export class SelectAmongAllComponent implements OnInit, OnChanges {

  @Input() question!: Question;
  @Input() questionVerified!: boolean;
  @Output() setAnswers = new EventEmitter<any>();

  isDesktopDevice: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  cellSize = 50;
  answerImageSize = 40;
  selectedAnswers: number[] = [];
  skipRotation: any = "";

  constructor(private questionsService: QuestionsService, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.deviceCheck();
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
    this.selectedAnswers = [];
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.setElementSize();
    })
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  verifyQuestion() {
    if (this.selectedAnswers.length > 0) {
      return this.selectedAnswers.every(answer => this.question.data.answers[answer].correct === true);
    } else {
      return false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.setElementSize();
      this.selectedAnswers = [];
      this.question.data.rightPattern.forEach((x: any, i: number) => {
        x.forEach((y: any, j: number) => {
          if (y === 'a') {
            this.question.data.answers[this.question.data.leftPattern[i][j]].selected = false;
            this.question.data.answers[this.question.data.leftPattern[i][j]].correct = true;
          }
        });
      });
    }
  }

  deviceCheck() {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  setElementSize() {

    const dataLength = this.question.data.leftPattern[0].length;
    let baseSize = this.isMobile ? 200 : this.isTablet ? 300 : dataLength <= 4 ? 250 : 400;

    const size = baseSize / dataLength;
    this.cellSize = size * dataLength;
    this.answerImageSize = dataLength <= 4 ? size * .7 : size * .85;
  }

  setObjectToCenterOfZone(answer: any, object: any, zone: any) {

    const dropzoneBounds = zone.getBoundingClientRect();

    const dropZoneCenterX = dropzoneBounds.x + (dropzoneBounds.width / 2);
    const dropZoneCenterY = dropzoneBounds.y + (dropzoneBounds.height / 2);

    const objectBounds = object.getBoundingClientRect();

    answer.x = dropZoneCenterX - objectBounds.width / 2;
    answer.y = dropZoneCenterY - objectBounds.height / 2;

    answer.dragPosition = { x: 0, y: 0 }
  }

  selectAnswer(index: number) {
    const maxAnswers = this.question.data.answers.filter((answer: any) => answer.correct === true).length;
    this.question.data.answers.forEach((answer: any) => {
      answer.selected = false;
    });

    if (maxAnswers === 1) {
      if (this.selectedAnswers.includes(index)) {
        this.selectedAnswers = [];
      } else if (this.selectedAnswers.includes(index)) {
        this.selectedAnswers = [];
      } else {
        this.selectedAnswers = [];
        this.selectedAnswers.push(index);
      }
    } else {
      if (this.selectedAnswers.length >= maxAnswers) {
        if (this.selectedAnswers.includes(index)) {
          this.selectedAnswers = [...this.selectedAnswers].filter((i: number) => i !== index)
        } else {
          this.selectedAnswers.shift();
          this.selectedAnswers.push(index);
        }
      } else {
        if (this.selectedAnswers.includes(index)) {
          this.selectedAnswers = [...this.selectedAnswers].filter((i: number) => i !== index)
        } else {
          this.selectedAnswers.push(index);
        }
      }

    }

    this.selectedAnswers.forEach((i: number) => {
      this.question.data.answers[i].selected = true;
    })
    this.setAnswers.emit(this.selectedAnswers);
  }

  setAnswerStyle(answer: any) {
    if (this.questionVerified && answer.correct) return { 'background-color': 'green', 'width': this.answerImageSize / 2.5 + 'px', 'height': this.answerImageSize / 2.5 + 'px' };
    if (this.questionVerified && !answer.correct && answer.selected) return { 'background-color': 'red', 'width': this.answerImageSize / 2.5 + 'px', 'height': this.answerImageSize / 2.5 + 'px' };
    return { 'background-color': '', 'display': 'none' };
  }

  checkIfAnsweredCorrectly(answer: any) {
    return (answer.correct && answer.selected) || (answer.correct && !answer.selected);
  }

  closeIcon(){
    this.skipRotation = "skip-rotate";
  }

}
