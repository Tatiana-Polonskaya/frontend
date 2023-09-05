import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typeQuestion } from "../../../models/survey";

  
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
    initialState:{answers:[initialState], step:0},
    reducers: {
        updateChoiceAnswers: (state, action: PayloadAction<LocalAnswer[]>) => {
            state.answers = action.payload;
        },
        setStepAnswers: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
    },
});

export default surveySlice.reducer;

export const { updateChoiceAnswers, setStepAnswers  } = surveySlice.actions;
