import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IResponse } from "../../../models/api";
import { IAnswerBack, ISurvey } from "../../../models/survey";
import customFetchBase from "../utils/customFetchBase";

export const surveyApi = createApi({
    reducerPath: "/api/survey",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getSurvey: build.query<IResponse<ISurvey>, string>({
            query: (title) => ({
                url: "/api/users/questionnaire",
                method: "GET",
                params: { title },
            }),
        }),
        sendAnswers: build.mutation<IResponse<void>, IAnswerBack>({
            query: ({ answers, questionnaire_title }) => ({
                url: "/api/users/register/complete",
                method: "POST",
                params: { questionnaire_title },
                body: answers,
            }),
        }),
    }),
});
