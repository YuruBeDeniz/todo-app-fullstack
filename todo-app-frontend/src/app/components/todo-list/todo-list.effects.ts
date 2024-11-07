import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TodoService } from '../../../services/todo.service';

@Injectable()
export class TodoListEffects {
    getTodos$ = createEffect(() => this.actions$.pipe(
        ofType('[TodoList Component] Get Todos'),
        exhaustMap(() => this.todoService.getTodos()
          .pipe(
            map(todos => ({ type: '[TodoList API] Todos Fetched', payload: todos })),
            catchError(error => EMPTY)
            //returns an empty observable if an error occurs
          )
        )
    ))

    constructor(
        private actions$: Actions,
        private todoService: TodoService
      ) {

        console.log('Actions:', this.actions$);  
      }
}