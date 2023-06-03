import { CdkDrag, CdkDragEnd, CdkDragRelease, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Question } from 'src/app/types/Question';
import { fromEvent, Observable, Subscription } from "rxjs";
import { DeviceDetectorService } from 'ngx-device-detector';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-drag-and-drop-repeat-pattern',
  templateUrl: './drag-and-drop-repeat-pattern.component.html',
  styleUrls: ['./drag-and-drop-repeat-pattern.component.css']
})
export class DragAndDropRepeatPatternComponent implements OnInit, OnChanges {

  @Input() question!: Question;
  @Input() questionVerified!: boolean;
  isDesktopDevice: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;
  displayedAnswers: any[] = [];
  parentElement: any = null;

  constructor(private questionsService: QuestionsService, private deviceService: DeviceDetectorService) {

  }

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  cellSize = 50;
  answerImageSize = 40;

  skipRotation: any = "";

  ngOnInit(): void {
    this.parentElement = document.querySelector('.wrapper');
    this.populateAnswers();
    this.deviceCheck();
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.setElementSize();
      setTimeout(() => {
        this.setAnswerCoordinates();
      }, 500);
    })
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  verifyQuestion() {
    return this.displayedAnswers.every(answer => answer.correct === true);
  }

  deviceCheck() {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  populateAnswers() {
    this.displayedAnswers = [];
    this.question.data.rightPattern.forEach((arr: any[], x: number) => {
      arr.forEach((cell: any, y: number) => {
        if (cell === "a") {
          const ans = this.question.data.answers[this.question.data.leftPattern[x][y]];
          ans.index = this.question.data.leftPattern[x][y];
          this.displayedAnswers.push(ans);
        }
      })
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.populateAnswers();
      this.setElementSize();
      this.question.data.answers.filter((x: any) => x.selected = false);
      setTimeout(() => {
        this.setAnswerCoordinates();
      }, 500);
    }
  }

  setElementSize() {
    this.question.data.answers.filter((a: any) => !a.selected).forEach((answer: any) => {
      answer.show = false;
    });
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();

    const dataLength = this.question.data.leftPattern[0].length;
    let baseSize = this.isMobile ? 150 : this.isTablet ? 200 : dataLength <= 4 ? 250 : 300;

    const size = baseSize / dataLength;
    this.cellSize = size * dataLength;
    this.answerImageSize = dataLength <= 4 ? size * .7 : size * .85;
  }

  setAnswerCoordinates() {

    const bounds = document.getElementsByClassName('answers')[0].getBoundingClientRect();

    this.question.data.answers.filter((a: any) => !a.selected).forEach((answer: any, i: number) => {
      answer.dragPosition = { x: 0, y: 0 }
      answer.show = true;
      answer.x = Math.round(Math.random() * (bounds!.width - 100)) + bounds!.x;
      answer.y = Math.round(Math.random() * (bounds!.height - 100)) + bounds!.y;
    });

    this.question.data.answers.filter((a: any) => a.selected).forEach((answer: any) => {
      const selectedCell = document.querySelector(`[data-position='${answer.selectedPosition}']`);
      const object = document.querySelector(`#answer-${answer.id}`);
      this.setObjectToCenterOfZone(answer, object, selectedCell);
    });

  }

  isObjectDroppedInZone(object: any, zone: any) {
    const objectBounds = object.getBoundingClientRect();
    const dropzoneBounds = zone.getBoundingClientRect();

    const dropZoneCenterX = dropzoneBounds.x + (dropzoneBounds.width / 2);
    const dropZoneCenterY = dropzoneBounds.y + (dropzoneBounds.height / 2);
    const dropZoneRadius = dropzoneBounds.width / 1.5;

    const x = objectBounds.x;
    const y = objectBounds.y;

    return Math.sqrt(Math.pow(dropZoneCenterX - (x + (objectBounds.width / 2)), 2) + Math.pow(dropZoneCenterY - (y + (objectBounds.height / 2)), 2)) <= dropZoneRadius;
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

  checkIsCorrect(x: number, y: number, i: number) {
    return this.question.data.leftPattern[x][y] === i;
  }

  setCellAsNotAnswered(answer: any, answerIndex: string) {
    document.querySelector(`[data-answered="${answerIndex}"`)?.setAttribute('data-answered', 'null');
    answer.correct = false;
    answer.selected = false;
    answer.selectedPosition = undefined;
  }

  drag(e: CdkDragStart) {
    const answer = e.source.data;
    const object = e.source.element.nativeElement;
    const answerIndex = object.getAttribute('data-index')!;
    this.setCellAsNotAnswered(answer, answerIndex);
  }

  drop(e: CdkDragEnd) {
    const answer = e.source.data;
    const wrapper = document.querySelector('.pattern-wrapper-answers');
    const cells = document.querySelectorAll('.pattern-cell-answers');
    const object = e.source.element.nativeElement;
    const answerIndex = object.getAttribute('data-index')!;
    if (this.isObjectDroppedInZone(object, wrapper)) {
      cells.forEach((cell, index) => {
        const cellPosition = cell.getAttribute('data-position');
        if (cellPosition) {
          if (this.isObjectDroppedInZone(object, cell)) {
            const alreadyAnswered = cell.getAttribute('data-answered');
            if(alreadyAnswered == "null"){
              document.querySelector(`[data-answered="${answerIndex}"`)?.setAttribute('data-answered', 'null');
              cell.setAttribute('data-answered', answerIndex);
              const pos = cell.getAttribute('data-position')?.split(',').map(x => +x)!;
              answer.correct = this.checkIsCorrect(pos[0], pos[1], +answerIndex);
              answer.selected = true;
              answer.selectedPosition = cellPosition;
              this.setObjectToCenterOfZone(this.question.data.answers[parseInt(answerIndex)], object, cell);
            } else {
              e.source.reset();
            }
          }
        }
      })
    } else {
      this.setCellAsNotAnswered(answer, answerIndex);
    }
  }

  setAnswerStyle(answer: any) {
    if (this.questionVerified && answer.correct) return { 'background-color': 'green', 'width': this.answerImageSize / 2.5 + 'px', 'height': this.answerImageSize / 2.5 + 'px' };
    if (this.questionVerified && !answer.correct && answer.selected) return { 'background-color': 'red', 'width': this.answerImageSize / 2.5 + 'px', 'height': this.answerImageSize / 2.5 + 'px' };
    return { 'background-color': '', 'display': 'none' };
  }

  checkIfAnsweredCorrectly(answer: any) {
    return (answer.correct && answer.selected) || (!answer.correct && !answer.selected);
  }

  closeIcon(){
    this.skipRotation = "skip-rotate";
  }

}
