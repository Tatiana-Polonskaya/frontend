import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer } from "../../../models/survey";

  
// Define the initial state using that type
const initialState: IAnswer = {
    question_id: null,
    choice_id: null,
    text: ""
}
  

const surveySlice = createSlice({
    name: "survey",
    initialState:{answers: [initialState]},
    reducers: {
        updateChoiceAnswers: (state, action: PayloadAction<Array<IAnswer>>) => {
            state.answers = action.payload;
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

export const { updateChoiceAnswers } = surveySlice.actions;
