import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { fromEvent, Observable, Subscription } from 'rxjs';
import helper from 'src/app/helper';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-multiple-choice-text-or-image-select-random',
  templateUrl: './multiple-choice-text-or-image-select-random.component.html',
  styleUrls: ['./multiple-choice-text-or-image-select-random.component.css']
})
export class MultipleChoiceTextOrImageSelectRandomComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;
  isDesktopDevice: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;
  answerImageSize = 100;

  constructor(private questionsService: QuestionsService, private deviceService: DeviceDetectorService) { } 
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  ngOnInit(): void {
    this.deviceCheck();
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.setAnswerImageSize();
      setTimeout(() => {
        this.setAnswerCoordinates();
      }, 500);
    })
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
  }
  
  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges) {
    // fix 1
    this.setAnswerImageSize();
    if (changes.question) {
      this.setAnswerCoordinates();
      this.questionVerified = false;
      this.question.data.answers.filter((x: any) => x.selected = false);
    }
  }

  deviceCheck() {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  setAnswerImageSize() {
    const size = this.question.data.answers.length <= 5 ? 150 : 80;
    if (this.isMobile) {
      this.answerImageSize = size / 2;
    } else if (this.isTablet) {
      this.answerImageSize = size / 1.5;
    } else {
      this.answerImageSize = size;
    }

  }

  setAnswerCoordinates() {

    this.question.data.objects.outside.forEach((obj: any) => {
      obj.show = false;
    })

    const bounds = document.getElementsByClassName('objects')[0].getBoundingClientRect();

    setTimeout(() => {
      this.question.data.objects.outside.forEach((os: any, i: number) => {
        os.x = Math.round(Math.random() * (bounds.width - 100)) + bounds.x;
        os.y = Math.round(Math.random() * (bounds.height - 100)) + bounds.y;
        os.show = true;
      });
    }, 500);

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

 /* getImageSize() {
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
  }*/
}
