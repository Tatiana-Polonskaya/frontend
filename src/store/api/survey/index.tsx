import { surveyApi } from "./surveyApi";

export const { useGetSurveyQuery, useSendAnswersMutation } = surveyApi;

export const { endpoints, reducerPath, reducer, middleware } = surveyApi;
