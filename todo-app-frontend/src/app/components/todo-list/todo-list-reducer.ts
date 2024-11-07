import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { addTodo, todosFetched } from './todo-list.actions';

export const initialState: Todo[] = [];

export const todoListReducer = createReducer(
  initialState,
  on(todosFetched, (state, { todos }) => [...todos]),
  on(addTodo, (state, { todo }) => [...state, todo])
);
