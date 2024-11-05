import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset } from "./calculator.actions";

const initialState = 0;

export const calculatorReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(reset, () => 0)
)