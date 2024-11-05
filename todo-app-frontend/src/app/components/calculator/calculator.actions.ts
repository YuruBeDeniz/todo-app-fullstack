import { createAction, props } from "@ngrx/store";

export const increment = createAction('[Calculator Component] increment');
export const decrement = createAction('[Calculator Component] decrement');
export const reset = createAction('[Calculator Component] reset');

export const multiply = createAction(
    '[Calculator Component] Multiply',
    props<{ num1: number; num2: number }>()
  );
  
  export const divide = createAction(
    '[Calculator Component] Divide',
    props<{ num1: number; num2: number }>()
  );
