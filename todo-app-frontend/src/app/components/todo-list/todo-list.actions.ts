import { createAction, props } from "@ngrx/store";
import { Todo } from "../../models/todo.model";

export const getTodos = createAction('[TodoList Component] Get Todos');
export const todosFetched = createAction('[TodoList Component] Todos Fetched', props<{ todos: Todo[] }>());
export const addTodo = createAction('[TodoList Component] Add Todo', props<{ todo: Todo }>());