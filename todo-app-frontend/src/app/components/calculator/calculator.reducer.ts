import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset, multiply, divide } from "./calculator.actions";

const initialState = 0;

export const calculatorReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(reset, () => 0),
    on(multiply, (state, { num1, num2 }) => num1 * num2),
    on(divide, (state, { num1, num2 }) => num2 !== 0 ? num1 / num2 : state)
)