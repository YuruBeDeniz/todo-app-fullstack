import { Component, signal } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset, multiply, divide } from './calculator.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  calculate$: Observable<number>
  displayValue = 0
  num: number = 0
  errorMessage = signal<string>("")

  constructor(private store: Store<{ calculate : number }>) {
    this.calculate$ = store.select('calculate')

    this.calculate$.subscribe(value => {
      this.displayValue = value;
    });
  }

  increment() {
    this.errorMessage.set("")
    this.store.dispatch(increment({ num: this.num }));
  }

  decrement() {
    this.errorMessage.set("")
    this.store.dispatch(decrement({ num: this.num }));
  }

  reset() {
    this.store.dispatch(reset());
    this.num = 0
    this.displayValue = 0
    this.errorMessage.set("")
  }

  multiply(num: number) {
    this.errorMessage.set("")
    this.store.dispatch(multiply({ num: this.num }));
  }

  divide() {
    this.errorMessage.set("");
    if(this.num !== 0) {
      this.store.dispatch(divide({ num: this.num}));
    } else {
      this.errorMessage.update(value => "Cannot divide by zero!")
    }
  }
}
