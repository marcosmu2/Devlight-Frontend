import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent{

  
  nameInput:string = "";
  @Output() onInputChanges : EventEmitter<string> = new EventEmitter()

  constructor() { }


  changesInput = () => {
    this.onInputChanges.emit(this.nameInput);
  }

}
