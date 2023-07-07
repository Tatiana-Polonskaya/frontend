export enum typeQuestion {
    checkbox = "checkbox",
    radio = "radio",
}

export enum typeStyleAnswers {
    row = "block-answers",
    column = "col-answers",
    icon_row = "icon-rows",
}

export interface ISurvey {
    id: string;
    title: string;
    questions: IQuestion[];
}

export interface IQuestion {
    id: string;
    title: string;
    type: typeQuestion;
    icons: boolean;
    type_choice: typeStyleAnswers;
    choices:IChoice[];
}

export interface IChoice {
    id: string;
    title: string;
    icon: string;
    another: boolean;
}

export interface IAnswer {
    question_id: string;
    choice_id: string;
    text: string;
}

export interface IAnswerBack {
    questionnaire_title: string,
    answers: IAnswer[],
}
