import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
import { MatTextareaAutosize } from '@angular/material';

@Component({
  selector: 'boss-textarea',
  templateUrl: './boss-textarea.component.html',
  styleUrls: ['./boss-textarea.component.scss']
})
export class BossTextareaComponent extends BossAutoFormControl implements AfterViewInit {

  @Input() public required: boolean;
  @Input() public hint: string;
  @ViewChild(MatTextareaAutosize) input: MatTextareaAutosize;
  ngAfterViewInit() {
    this.subs.push(this.control.valueChanges.subscribe(() => setTimeout(() => this.input.resizeToFitContent())));
  }
}
