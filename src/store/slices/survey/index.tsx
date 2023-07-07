import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer, typeQuestion } from "../../../models/survey";

  
// Define the initial state using that type
export type LocalAnswer = {
    id_question: string;
    type_question: typeQuestion;
    id_choices: Array<string>;
    another_choices: string;
}

// Define the initial state using that type
const initialState: LocalAnswer = {
    id_question: "",
    type_question: typeQuestion.radio,
    id_choices: [],
    another_choices: "",
}
  

const surveySlice = createSlice({
    name: "survey",
    initialState:{answers:[initialState]},
    reducers: {
        updateChoiceAnswers: (state, action: PayloadAction<LocalAnswer[]>) => {
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

export const { updateChoiceAnswers  } = surveySlice.actions;
