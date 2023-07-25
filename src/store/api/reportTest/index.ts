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

export const reportTestApi = createApi({
    // reducerPath: "/api/video/",
    reducerPath: "/api/reportTest/",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getArgumentativenessByIdTest: build.query<
            IResponse<ArgumentativenessJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.argumentativeness}`,
                params: { id },
                method: "GET",
            }),
        }),
        getClarityByIdTest: build.query<IResponse<ClarityJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.clarity}`,
                params: { id },
                method: "GET",
            }),
        }),
        getCommunicativeByIdTest: build.query<
            IResponse<CommunicativeJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.communicative}`,
                params: { id },
                method: "GET",
            }),
        }),
        getConfidenceByIdTest: build.query<IResponse<ConfidenceJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.confidence}`,
                params: { id },
                method: "GET",
            }),
        }),
        getCongruenceByIdTest: build.query<IResponse<CongruenceJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.congruence}`,
                params: { id },
                method: "GET",
            }),
        }),
        getConnectivityByIdTest: build.query<
            IResponse<ConnectivityJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.connectivity}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEloquenceByIdTest: build.query<IResponse<EloquenceJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.eloquence}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEmotionalArousalByIdTest: build.query<
            IResponse<EmotionalArousalJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.emotional_arousal}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEmotionalityByIdTest: build.query<
            IResponse<EmotionalityJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.emotionality}`,
                params: { id },
                method: "GET",
            }),
        }),
        getEnergyByIdTest: build.query<IResponse<EnergyJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.energy}`,
                params: { id },
                method: "GET",
            }),
        }),
        getExpressivenessByIdTest: build.query<
            IResponse<ExpressivenessJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.expressiveness}`,
                params: { id },
                method: "GET",
            }),
        }),
        getInformativeByIdTest: build.query<IResponse<InformativeJSON>, string>(
            {
                query: (id) => ({
                    url: `/api/video/${id}/test-report/${TYPE_REPORT.informative}`,
                    params: { id },
                    method: "GET",
                }),
            }
        ),
        getNonMonotonyByIdTest: build.query<IResponse<NonMonotonyJSON>, string>(
            {
                query: (id) => ({
                    url: `/api/video/${id}/test-report/${TYPE_REPORT.non_monotony}`,
                    params: { id },
                    method: "GET",
                }),
            }
        ),
        getTotalByIdTest: build.query<IResponse<TotalGraphJSON>, string>({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.total}`,
                params: { id },
                method: "GET",
            }),
        }),
        // getTotalByIdTest: build.query<IResponse<TotalGraphJSON>, string>({
        //     query: (id, type = TYPE_REPORT.total) => ({
        //         url: `/api/video/${id}/test-report/${TYPE_REPORT.total}`,
        //         params: { id, type },
        //         method: "GET",
        //     }),
        // }),
        getTranscriptionByIdTest: build.query<
            IResponse<TranscriptionJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.text}`,
                params: { id },
                method: "GET",
            }),
        }),
        getUnityOfStyleByIdTest: build.query<
            IResponse<UnityOfStyleJSON>,
            string
        >({
            query: (id) => ({
                url: `/api/video/${id}/test-report/${TYPE_REPORT.unity_of_style}`,
                params: { id },
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetConnectivityByIdTestQuery,
    useGetConfidenceByIdTestQuery,
    useGetArgumentativenessByIdTestQuery,
    useGetClarityByIdTestQuery,
    useGetCommunicativeByIdTestQuery,
    useGetEmotionalityByIdTestQuery,
    useGetUnityOfStyleByIdTestQuery,
    useGetNonMonotonyByIdTestQuery,
    useGetInformativeByIdTestQuery,
    useGetEnergyByIdTestQuery,
    useGetEloquenceByIdTestQuery,
    useGetEmotionalArousalByIdTestQuery,
    useGetTotalByIdTestQuery,
    useGetTranscriptionByIdTestQuery,
    useGetCongruenceByIdTestQuery,
    useGetExpressivenessByIdTestQuery,
    // useLazyGetConnectivityByIdTestQuery,
    // useLazyGetConfidenceByIdTestQuery,
    // useLazyGetArgumentativenessByIdTestQuery,
    // useLazyGetClarityByIdTestQuery,
    // useLazyGetCommunicativeByIdTestQuery,
    // useLazyGetEmotionalityByIdTestQuery,
    // useLazyGetUnityOfStyleByIdTestQuery,
    // useLazyGetInformativeByIdTestQuery,
    // useLazyGetEnergyByIdTestQuery,
    // useLazyGetEloquenceByIdTestQuery,
    // useLazyGetNonMonotonyByIdTestQuery,
    // useLazyGetEmotionalArousalByIdTestQuery,
    // useLazyGetTotalByIdTestQuery,
} = reportTestApi;

export const { endpoints, reducerPath, reducer, middleware } = reportTestApi;
