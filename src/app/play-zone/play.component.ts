import {Component} from "@angular/core";

@Component({
  selector: 'play-component',
  template: `
  <ul class="list-group" *ngFor="let number of numbers">
  <li class="list-group-item">{{number}}</li>
</ul>

  
`
})

export class PlayComponent{
  value: number;

  numbers = [1, 2, 3, 4];


  constructor(){
    this.value = 1;
  }

  increase(){
    this.value++;
  }

  decrease(){
    this.value--;
  }



}
