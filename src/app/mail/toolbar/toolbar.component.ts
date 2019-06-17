import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() mail;
  @Input() itemCount: number = 0;
  @Output() onForward = new EventEmitter();

  constructor() {
    console.log("itemCount: " + this.itemCount);
  }

  ngOnInit() {
  }

  onForwardTriggered() {
    this.onForward.emit(true);
  }

}
