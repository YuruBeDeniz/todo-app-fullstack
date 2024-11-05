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
  num1: number = 0
  num2: number = 0
  errorMessage = signal<string>("")

  constructor(private store: Store<{ calculate : number }>) {
    this.calculate$ = store.select('calculate')
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
    this.num1 = 0
    this.num2 = 0
    this.errorMessage.set("")
  }

  multiply(num1: number, num2: number) {
    this.store.dispatch(multiply({ num1: this.num1, num2: this.num2 }));
  }

  divide() {
    this.errorMessage.set("");
    if(this.num2 !== 0) {
      this.store.dispatch(divide({ num1: this.num1, num2: this.num2 }));
    } else {
      this.errorMessage.update(value => "Cannot divide by zero!")
    }
  }
}
