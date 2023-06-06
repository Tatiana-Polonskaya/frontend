import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import { IAnswer, ISurvey } from "../../../models/survey";

export const surveyApi = createApi({
    reducerPath: "api/survey",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (build) => ({
        getSurvey: build.query<IResponse<ISurvey>, string>({
            query: (title) => ({
                url: "questionnaire",
                method: "GET",
                params: {title},
            }),
        }),
        sendAnswers: build.mutation<IResponse<void>, IAnswer[]>({
            query: (answers) => ({
                url: "/register/complete",
                method: "POST",
                body: { answers },
            }),
        }),
        confirm: build.query<IResponse<void>, string>({
            query: (token) => ({
                url: `confirm/${token}`,
                method: "GET",
            }),
        }),
        resendEmail: build.mutation<IResponse<void>, string>({
            query: (email) => ({
                url: "resend-email",
                params: { email },
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetSurveyQuery,
    useSendAnswersMutation,
} = surveyApi;

export const { endpoints, reducerPath, reducer, middleware } = surveyApi;
