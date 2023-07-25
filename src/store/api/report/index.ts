import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../utils/customFetchBase";

import { IResponse } from "../../../models/api";
import { TYPE_REPORT } from "../../../models/report/_types";

import { ConnectivityJSON } from "../../../models/graph/connectivity";
import { ConfidenceJSON } from "../../../models/graph/confidence";
import { ClarityJSON } from "../../../models/graph/clarity";
import { ArgumentativenessJSON } from "../../../models/graph/argumentativeness";
import { CommunicativeJSON } from "../../../models/graph/communicative";
import { EmotionalityJSON } from "../../../models/graph/emotionality";
import { UnityOfStyleJSON } from "../../../models/graph/unity_of_style";
import { NonMonotonyJSON } from "../../../models/graph/monotony";
import { InformativeJSON } from "../../../models/graph/informative";
import { EnergyJSON } from "../../../models/graph/energy";
import { EloquenceJSON } from "../../../models/graph/eloquence";
import { EmotionalArousalJSON } from "../../../models/graph/emotional_arousal";
import { TotalGraphJSON } from "../../../models/graph/total";
import { ExpressivenessJSON } from "../../../models/graph/expressiveness";
import { CongruenceJSON } from "../../../models/graph/congruence";
import { TranscriptionJSON } from "../../../models/report/transcription";

export const reportApi = createApi({
    reducerPath: "/api/video/",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getArgumentativenessById: build.query<
            IResponse<ArgumentativenessJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.argumentativeness}`,
                params: { id },
                method: "GET",
            }),
        }),
        getClarityById: build.query<IResponse<ClarityJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.clarity}`,
                params: { id },
                method: "GET",
            }),
        }),
        getCommunicativeById: build.query<IResponse<CommunicativeJSON>, string>(
            {
                query: (id) => ({
                    url: `/api/video/${id}/report/${TYPE_REPORT.communicative}`,
                    params: { id },
                    method: "GET",
                }),
            }
        ),
        getConfidenceById: build.query<IResponse<ConfidenceJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.confidence}`,
                params: { id },
                method: "GET",
            }),
        }),
        getCongruenceById: build.query<IResponse<CongruenceJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.congruence}`,
                params: { id },
                method: "GET",
            }),
        }),
        getConnectivityById: build.query<IResponse<ConnectivityJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.connectivity}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEloquenceById: build.query<IResponse<EloquenceJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.eloquence}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEmotionalArousalById: build.query<
            IResponse<EmotionalArousalJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.emotional_arousal}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEmotionalityById: build.query<IResponse<EmotionalityJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.emotionality}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEnergyById: build.query<IResponse<EnergyJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.energy}`,
                params: { id },
                method: "GET",
            }),
        }),
        getExpressivenessById: build.query<
            IResponse<ExpressivenessJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.expressiveness}`,
                params: { id },
                method: "GET",
            }),
        }),
        getInformativeById: build.query<IResponse<InformativeJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.informative}`,
                params: { id },
                method: "GET",
            }),
        }),
        getNonMonotonyById: build.query<IResponse<NonMonotonyJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.non_monotony}`,
                params: { id },
                method: "GET",
            }),
        }),
        getTotalById: build.query<IResponse<TotalGraphJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.total}`,
                params: { id },
                method: "GET",
            }),
        }),
        getTranscriptionById: build.query<IResponse<TranscriptionJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.text}`,
                params: { id },
                method: "GET",
            }),
        }),
        getUnityOfStyleById: build.query<IResponse<UnityOfStyleJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/report/${TYPE_REPORT.unity_of_style}`,
                params: { id },
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetConnectivityByIdQuery,
    useGetConfidenceByIdQuery,
    useGetArgumentativenessByIdQuery,
    useGetClarityByIdQuery,
    useGetCommunicativeByIdQuery,
    useGetEmotionalityByIdQuery,
    useGetUnityOfStyleByIdQuery,
    useGetNonMonotonyByIdQuery,
    useGetInformativeByIdQuery,
    useGetEnergyByIdQuery,
    useGetEloquenceByIdQuery,
    useGetEmotionalArousalByIdQuery,
    useGetTotalByIdQuery,
    useGetTranscriptionByIdQuery,
    useGetCongruenceByIdQuery,
    useGetExpressivenessByIdQuery,
    useLazyGetConnectivityByIdQuery,
    useLazyGetConfidenceByIdQuery,
    useLazyGetArgumentativenessByIdQuery,
    useLazyGetClarityByIdQuery,
    useLazyGetCommunicativeByIdQuery,
    useLazyGetEmotionalityByIdQuery,
    useLazyGetUnityOfStyleByIdQuery,
    useLazyGetInformativeByIdQuery,
    useLazyGetEnergyByIdQuery,
    useLazyGetEloquenceByIdQuery,
    useLazyGetNonMonotonyByIdQuery,
    useLazyGetEmotionalArousalByIdQuery,
    useLazyGetTotalByIdQuery
} = reportApi;

export const { endpoints, reducerPath, reducer, middleware } = reportApi;
