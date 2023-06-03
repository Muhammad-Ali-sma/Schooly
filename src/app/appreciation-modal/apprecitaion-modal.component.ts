import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-apprecitaion-modal',
  templateUrl: './apprecitaion-modal.component.html',
  styleUrls: ['./apprecitaion-modal.component.css']
})
export class AppreciationModalComponent implements OnInit {

  @Output() cancel = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<boolean>();
  @Input() continuousCorrectAnswer : number = 0;
  public clicked = false;

  constructor(
    private renderer2: Renderer2,
  ) { }

  surprise(): void {

    const canvas = this.renderer2.createElement('canvas');
    this.renderer2.insertBefore(document.getElementById('appreciation-modal'), canvas, document.getElementById('animation'));
    const myConfetti = confetti.create(canvas, {
      resize: true,
    });

    myConfetti();
  }
  ngOnInit(): void {
    this.surprise();
  }
}


