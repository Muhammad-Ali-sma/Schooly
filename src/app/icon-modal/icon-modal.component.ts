import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-icon-modal',
  templateUrl: './icon-modal.component.html',
  styleUrls: ['./icon-modal.component.css']
})
export class IconModalComponent implements OnInit {
  @Output() cancel = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<string>();
  @Input() selectedIcon: string = 'fa fa-star';

  icons: string[] = []
  constructor() { }

  ngOnInit(): void {
    ['fa fa-star', 'fal fa-rocket', 'far fa-ice-cream', 'fas fa-futbol'].filter(x => {
      if (x !== this.selectedIcon) {
        this.icons.push(x);
      }
    })
  }

}
