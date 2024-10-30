import { Component, DestroyRef, inject, NgZone, OnInit } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { interval, Observable, Subscription, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'todo-app-frontend'
  subscription!: Subscription;
  private destroyRef = inject(DestroyRef);
  private ngZone = inject(NgZone);

  //we dont control what will happen when we emit this event
  //but by creating a custom observable we control WHEN we emit it
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0
    const interval = setInterval(() => {
      if(timesExecuted > 2) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log("emitting new value")
      subscriber.next({ message: "new value", value: 1})
      timesExecuted++;
    }, 2000)
  })

  constructor() {
    console.log(this.subscription);  // undefined at first as ngOnInit hasnt run yet
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      interval(1000).pipe(takeWhile((val) => val < 2)).subscribe({
        next: (val) => console.log("Outside Angular zone:", val),
        complete: () => console.log("Task completed"),
      });
    });
  

    this.ngZone.runOutsideAngular(() => {
      this.subscription = interval(1000).subscribe({
        next: (val) => {
          console.log("Outside Angular zone:", val);
          if (val >= 2) {
            this.subscription.unsubscribe();
            console.log("Unsubscribed from second interval");
          }
        }
      })
    });

    this.customInterval$.subscribe({
      next: (data) => console.log(data),
      complete: () => console.log("Custom Observable - COMPLETED")
    })
  }
}

/* 
    const subscriptionEx = interval(1000).subscribe({
      next: (val) => console.log("subscriptionEx val:", val)
    });

    this.destroyRef.onDestroy(() => {
      subscriptionEx.unsubscribe();
      console.log("Destroy ref triggered");
    });
*/