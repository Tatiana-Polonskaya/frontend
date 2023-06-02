import { UUID } from "crypto";

enum typeQuestion {
    checkbox = "checkbox",
    radio = "radio",
}
enum typeStyleAnswers {
    row = "block-answers",
    column = "col-answers",
    icon_row = "icon-rows",
}

export interface ISurvey {
    id: UUID;
    title: string;
    questions: IQuestion[];
}

export interface IQuestion {
    id: UUID;
    title: string;
    type: typeQuestion;
    icons: boolean;
    type_choice: typeStyleAnswers;
    choices:IChoice[];
}

export interface IChoice {
    id: UUID;
    title: string;
    icon: string;
    another: boolean;
}

export interface IAnswer {
    question_id: UUID | null;
    choice_id: UUID | null;
    text: string;
}
