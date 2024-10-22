import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input() set count(value: number) {
    this.countSignal.set(value);
  }
  @Output() countChange = new EventEmitter<number>();

  countSignal = signal(0)
   constructor(){
    console.log(this.countSignal)
   }

  updateCount(amount: number): void {
    console.log(this.countSignal()) //in the first increment, it is undefined, why?
    this.countSignal.update(currentValue => (currentValue|| 0) + amount);
    this.countChange.emit(this.countSignal());
  }
}


/* 
  @Input() count: number = 0; 
  @Output() countChange = new EventEmitter<number>();

  updateCount(amount: number): void {
    this.count = (this.count || 0) + amount; 
    this.countChange.emit(this.count);
  }
*/
