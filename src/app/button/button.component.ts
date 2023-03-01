import { Component, OnInit, Input, Output} from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label = '';
  @Output() clicked = new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
  }

}
