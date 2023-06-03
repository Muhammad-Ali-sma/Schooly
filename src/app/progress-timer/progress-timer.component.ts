import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-timer',
  templateUrl: './progress-timer.component.html',
  styleUrls: ['./progress-timer.component.css']
})
export class ProgressTimerComponent implements OnInit {
  @Input() value: number = 0;
  @Input() divider: number = 900;
  @Input() strokeWidth: number = 8;

  radius: number = 0;
  diameter: number = 0;
  percentage: number = 0;
  pathDescription: string = '';

  constructor() { }
  ngOnInit() {
    this.radius = (50 - this.strokeWidth / 2);
    this.pathDescription = `
      M 50,50 m 0,-${this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}
    `;

    this.diameter = Math.PI * 2 * this.radius;
    this.percentage = (this.value / this.divider) * 100;
  }
}
