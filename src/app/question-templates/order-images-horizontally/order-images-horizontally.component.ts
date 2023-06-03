import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';
// @ts-ignore
import { Sortable } from '@shopify/draggable';

@Component({
  selector: 'app-order-images-horizontally',
  templateUrl: './order-images-horizontally.component.html',
  styleUrls: ['./order-images-horizontally.component.css']
})
export class OrderImagesHorizontallyComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;

  constructor(private questionsService: QuestionsService) { }
  totalWidth = 0;
  skipRotation: any = "";

  ngOnInit(): void {
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
    this.totalWidth = 0;
    this.question.data.images.forEach((img: any) => {
      this.totalWidth += img.size;
    });
    const sortable = new Sortable(document.querySelectorAll('.images'), {
      draggable: 'img',
      distance: 10,
      delay: {
        mouse: 0,
        drag: 0,
        touch: 0,
      },
      mirror: {
        constrainDimensions: true,
        cursorOffsetX: 25,
        cursorOffsetY: 25,
      }
    });

    sortable.on('sortable:stop', (e: any) => {
      if(e.data.newIndex !== e.data.oldIndex){
        const movedImage = this.question.data.images[e.data.oldIndex];
        let tempImages = this.question.data.images.filter((x: any,i: number) => i !== e.data.oldIndex);
        tempImages.splice(e.data.newIndex, 0, movedImage);
        this.question.data.images = tempImages;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.totalWidth = 0;
      this.question.data.images.forEach((img: any) => {
        this.totalWidth += img.size;
      });
    }
  }

  verifyQuestion() {
    if (this.question.data.images.length < 2) return true;
    for (let i = 0; i < this.question.data.images.length - 1; i++) {
      if (this.question.data.images[i].hasOwnProperty('order')) {
        if (this.checkPositions(this.question.data.images[i].order, this.question.data.images[i + 1].order)) return false;
      } else {
        if (this.question.data.images[i].size > this.question.data.images[i + 1].size) return false;
      }
    }
    return true;
  }

  checkPositions(order1: any, order2: any){
    var orderBreak = order1.toString().split("|");
    var orderBreak2 = order2.toString().split("|");
    var orders: any[] = [];
    for (let i = 0; i < orderBreak.length; i++) {
      for (let j = 0; j < orderBreak2.length; j++) {
        orders.push(`${orderBreak[i]} >= ${orderBreak2[j]}`);
      }
    }
    let combined = orders.join(" && ");
    if (eval(combined)) {
      return true;
    }
    return false;
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

  getResponsiveImageSize(size: number) {
    if(this.totalWidth > 0){
      return (((size/this.totalWidth)*100)-3) + "%";
    }
    return size + "px";
  }

  closeIcon(){
    this.skipRotation = "skip-rotate";
  }

}
