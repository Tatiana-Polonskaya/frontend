import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface Answers {
    choiceAnswers: Array<number | boolean[]>,
    anotherAnswers: Array<string>,
}
  
// Define the initial state using that type
const initialState: Answers = {
    choiceAnswers: [],
    anotherAnswers: [],
}
  

const surveySlice = createSlice({
    name: "survey",
    initialState,
    reducers: {
        updateChoiceAnswers: (state, action: PayloadAction<Array<number | boolean[]>>) => {
            state.choiceAnswers = action.payload;
        },
        updateAnotherAnswers: (state, action: PayloadAction<Array<string>>) => {
            state.anotherAnswers = action.payload;
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        //  // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
});

export default surveySlice.reducer;

export const { updateChoiceAnswers, updateAnotherAnswers } = surveySlice.actions;
