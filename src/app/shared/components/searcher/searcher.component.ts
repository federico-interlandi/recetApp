import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css'
})
export class SearcherComponent {
  @Output() callbackData: EventEmitter<any> = new  EventEmitter()
  src: string = ''

  constructor(){}

  ngOnInit(): void {}

  callSearch(term: string) : void{
    if(term.length >= 3){
      this.callbackData.emit(term)
    }
    else {
      this.callbackData.emit('')
    }
  }
}
