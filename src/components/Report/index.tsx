/* eslint-disable react-hooks/rules-of-hooks */
import { cn } from "@bem-react/classname";

import Tabs, { TYPE_TABS } from "../Tabs";

import lamp from "../../components/Analytics/-Block/Argumentation/icons/lamp-on.svg";
import caps from "../../components/Analytics/-Block/Argumentation/icons/smallcaps.svg";
import quote from "../../components/Analytics/-Block/Argumentation/icons/quote-down-square.svg";

import { ReactSVG } from "react-svg";
import CommonAnalitics from "./CommonAnalitics";
import MainDefinition from "../Analytics/-Block/Clarity/Definition/Main";
import SecondaryDefinition from "../Analytics/-Block/Clarity/Definition/Secondary";
import MainExpressiveness from "../Analytics/-Block/Clarity/Expressiveness/Main";
import SecondaryExpressiveness from "../Analytics/-Block/Clarity/Expressiveness/Secondary";
import MainSubsequence from "../Analytics/-Block/Connectivity/Subsequence/Main";
import SecondarySubsequence from "../Analytics/-Block/Connectivity/Subsequence/Secondary";
import MainOriginally from "../Analytics/-Block/Argumentation/Originally/Main";
import SecondaryOriginally from "../Analytics/-Block/Argumentation/Originally/Secondary";
import SecondaryEnergy from "../Analytics/-Block/Dinamism/Energy/Secondary";
import SecondaryDefeat from "../Analytics/-Block/Communicative/Defeat/Secondary";
import MainConfidence from "../Analytics/-Block/Persuasiveness/Confidence/Main";
import SecondaryConfidence from "../Analytics/-Block/Persuasiveness/Confidence/Secondary";
import SecondaryEmotionalArousal from "../Analytics/-Block/Persuasiveness/EmotionalArousal/Secondary";

import {
    convertClarityDataLine,
    convertConnectivityDataLine,
    convertExpressivenessDataLine,
} from "../Analytics/helpers";

import {
    getTotalDesc,
    getTotalResult,
    judgmentHelper,
    statmentHelper,
} from "./helpers";

import ColorfulTabs from "../ColorfulTabs";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import SpeechTranscription from "../SpeechTranscription";
import VideoNotice from "../VideoNotice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import CommunicativeNorm from "../Graphs/communicativeNorm";
import Eloquence from "../Graphs/eloquence";
import EloquenceText from "../Graphs/eloquence/EloquenceText";
import InformativeGraph from "../Graphs/Informative/InformativeGraph";
import UnityOfStyl from "../Graphs/unityOfStyle/UnityOfStyl";
import InformativScale from "../Graphs/Informative/InformativScale";
import UnityOfStylScale from "../Graphs/unityOfStyle";
import EnergySmile from "../Graphs/EnergySmile";
import Emotionality from "../Graphs/Emotionality/Emotionality";
import EmotionalScale from "../Graphs/EmotionalScale";
import EmotionalArousal from "../Graphs/EmotionalArousal";
import CongruenceScale from "../Graphs/CongruenceScale";
import Congruence from "../Graphs/Congruence";

import { InformativeJSON } from "../../models/graph/informative";
import Dropdown from "../Dropdown";
import { UnityOfStyleDataItem } from "../../models/graph/unity_of_style";

import { ConnectivityJSON } from "../../models/graph/connectivity";
import { ArgumentativenessJSON } from "../../models/graph/argumentativeness";
import { ClarityJSON } from "../../models/graph/clarity";
import { EloquenceJSON } from "../../models/graph/eloquence";
import { ExpressivenessJSON } from "../../models/graph/expressiveness";
import { NonMonotonyJSON } from "../../models/graph/monotony";
import { ChannelInfo, EmotionalityJSON } from "../../models/graph/emotionality";
import { EnergyJSON } from "../../models/graph/energy";
import { CongruenceJSON } from "../../models/graph/congruence";
import { ConfidenceJSON } from "../../models/graph/confidence";
import { EmotionalArousalJSON } from "../../models/graph/emotional_arousal";
import { CommunicativeJSON } from "../../models/graph/communicative";

import { TotalGraphJSON } from "../../models/graph/total";
import { useGetVideoInfoByIdQuery } from "../../store/api/userVideo";
import { IVideoInfo } from "../../models/video";
import { getPrettyDuration } from "../PreviewBlock";
import MainNonMonotony from "../Analytics/-Block/Dinamism/NonMonotony/Main";
import SecondaryNonMonotony from "../Analytics/-Block/Dinamism/NonMonotony/Secondary";
import VideoPlayer, { getPrettyDataTime } from "../VideoPlayer";
import textForEnergySmile from "../Graphs/EnergySmile/text";

import AddTextUnityOfStyle from "../Graphs/unityOfStyle/text";

import noteIcon from "./assets/note.svg";
import arrowLeft from "./assets/arrowLeft.svg";
import "./style.scss";
import Recomendation from "../Analytics/-Block/-Recomendation";

import {
    useGetArgumentativenessByIdTestQuery,
    useGetClarityByIdTestQuery,
    useGetCommunicativeByIdTestQuery,
    useGetConfidenceByIdTestQuery,
    useGetCongruenceByIdTestQuery,
    useGetConnectivityByIdTestQuery,
    useGetEloquenceByIdTestQuery,
    useGetEmotionalArousalByIdTestQuery,
    useGetEmotionalityByIdTestQuery,
    useGetEnergyByIdTestQuery,
    useGetExpressivenessByIdTestQuery,
    useGetInformativeByIdTestQuery,
    useGetNonMonotonyByIdTestQuery,
    useGetTotalByIdTestQuery,
    useGetUnityOfStyleByIdTestQuery,
} from "../../store/api/reportTest";

import AddTextEloquence from "../Graphs/eloquence/text";
import {
    NonMonotonyTempHelper,
    NonMonotonyToneHelper,
    NonMonotonyVolumeHelper,
} from "../Analytics/-Block/Dinamism/NonMonotony/Main/helper";

import argumentativenessData1 from "./../../plugs/argumentativeness.json";
import { useGetVideoByIdQuery } from "../../store/api/apiWithDifAnswers";
import { UUID } from "crypto";
import { VideoTimeContext } from "../Context/helpers";

export default function AnalysisReport() {
    const cnReport = cn("AnalysisReport");

    const params = useParams();
    const idVideo = params.id
        ? params.id
        : "ec9a839f-55c4-4504-9fdf-e6ff3c49766f";

    const locationParams = useLocation();
    const [isMainVideo, setIsMainVideo] = useState(false);

    useEffect(() => {
        if (
            locationParams &&
            locationParams.state &&
            "main" in locationParams.state
        ) {
            setIsMainVideo(true);
        }
    }, [locationParams]);

    // common info about video: title, date, duration
    const videoInfoFromBack = useGetVideoInfoByIdQuery(idVideo);
    const [videoInfo, setVideoInfo] = useState<IVideoInfo>();
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    useEffect(() => {
        if (videoInfoFromBack && videoInfoFromBack.data) {
            setVideoInfo(videoInfoFromBack.data!.data);

            if (videoInfoFromBack.data!.data?.user_id !== "None") {
                setIsPrivate(true);
            }
        }
    }, [videoInfoFromBack]);

    const navigate = useNavigate();

    // state for video playing
    const [currentTime, setCurrentTime] = useState(0);
    // state for video playing
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // all states for showing it on the page
    const [informativeData, setInformativeData] = useState<InformativeJSON>();
    const [unityOfStyleData, setUnityOfStyleData] =
        useState<UnityOfStyleDataItem>();
    const [connectivityData, setConnectivityData] =
        useState<ConnectivityJSON>();
    const [argumentativenessData, setArgumentativenessData] =
        useState<ArgumentativenessJSON>();
    const [clarityData, setClarityData] = useState<ClarityJSON>();
    const [eloquenceData, setEloquenceData] = useState<EloquenceJSON>();
    const [expressivenessData, setExpressivenessData] =
        useState<ExpressivenessJSON>();
    const [nonMonotonyData, setNonMonotonyData] = useState<NonMonotonyJSON>();
    const [emotionalityData, setEmotionalityData] =
        useState<EmotionalityJSON>();
    const [energyData, setEnergyData] = useState<EnergyJSON>();
    const [congruenceData, setCongruenceData] = useState<CongruenceJSON>();
    const [confidenceData, setConfidenceData] = useState<ConfidenceJSON>();
    const [emotionalArousalData, setEmotionalArousalData] =
        useState<EmotionalArousalJSON>();
    const [communicativeData, setCommunicativeData] =
        useState<CommunicativeJSON>();
    const [totalData, setTotalData] = useState<TotalGraphJSON>();

    // all queries
    const ConnectivityDataFromBack = useGetConnectivityByIdTestQuery(idVideo);
    const InformativeDataFromBack = useGetInformativeByIdTestQuery(idVideo);
    const UnityOfStyleDataFromBack = useGetUnityOfStyleByIdTestQuery(idVideo);
    const ArgumentativenessDataFromBack =
        useGetArgumentativenessByIdTestQuery(idVideo);
    const ClarityDataFromBack = useGetClarityByIdTestQuery(idVideo);
    const EloquenceDataFromBack = useGetEloquenceByIdTestQuery(idVideo);
    const ExpressivenessDataFromBack =
        useGetExpressivenessByIdTestQuery(idVideo);
    const NonMonotonyDataFromBack = useGetNonMonotonyByIdTestQuery(idVideo);
    const EmotionalityDataFromBack = useGetEmotionalityByIdTestQuery(idVideo);
    const EnergyDataFromBack = useGetEnergyByIdTestQuery(idVideo);
    const CongruenceDataFromBack = useGetCongruenceByIdTestQuery(idVideo);
    const ConfidenceDataFromBack = useGetConfidenceByIdTestQuery(idVideo);
    const EmotionalArousalDataFromBack =
        useGetEmotionalArousalByIdTestQuery(idVideo);
    const CommunicativeDataFromBack = useGetCommunicativeByIdTestQuery(idVideo);
    const TotalDataFromBack = useGetTotalByIdTestQuery(idVideo);

    useEffect(() => {
        if (ConnectivityDataFromBack && ConnectivityDataFromBack.data) {
            console.log(
                "ConnectivityDataFromBack",
                ConnectivityDataFromBack.data.data,
            );
            setConnectivityData(ConnectivityDataFromBack.data.data);
        }
    }, [ConnectivityDataFromBack]);

    useEffect(() => {
        if (InformativeDataFromBack && InformativeDataFromBack.data) {
            console.log(
                "InformativeDataFromBack",
                InformativeDataFromBack.data.data,
            );
            setInformativeData(InformativeDataFromBack.data.data);
        }
    }, [InformativeDataFromBack]);

    useEffect(() => {
        if (
            UnityOfStyleDataFromBack &&
            UnityOfStyleDataFromBack.data &&
            UnityOfStyleDataFromBack.data.data!.values
        ) {
            console.log(
                "UnityOfStyleDataFromBack",
                UnityOfStyleDataFromBack.data.data,
            );
            setUnityOfStyleData(UnityOfStyleDataFromBack.data.data!.values);
        }
    }, [UnityOfStyleDataFromBack]);

    useEffect(() => {
        if (
            ArgumentativenessDataFromBack &&
            ArgumentativenessDataFromBack.data
        ) {
            console.log(
                "ArgumentativenessDataFromBack",
                ArgumentativenessDataFromBack.data.data,
            );
            setArgumentativenessData(ArgumentativenessDataFromBack.data.data);
        }
    }, [ArgumentativenessDataFromBack]);

    useEffect(() => {
        if (ClarityDataFromBack && ClarityDataFromBack.data) {
            console.log("ClarityDataFromBack", ClarityDataFromBack.data.data);
            setClarityData(ClarityDataFromBack.data.data);
        }
    }, [ClarityDataFromBack]);

    useEffect(() => {
        if (EloquenceDataFromBack && EloquenceDataFromBack.data) {
            console.log(
                "EloquenceDataFromBack",
                EloquenceDataFromBack.data.data,
            );
            setEloquenceData(EloquenceDataFromBack.data.data);
        }
    }, [EloquenceDataFromBack]);

    useEffect(() => {
        if (ExpressivenessDataFromBack && ExpressivenessDataFromBack.data) {
            console.log(
                "ExpressivenessDataFromBack",
                ExpressivenessDataFromBack.data,
            );
            setExpressivenessData(ExpressivenessDataFromBack.data.data);
        }
    }, [ExpressivenessDataFromBack]);

    useEffect(() => {
        if (NonMonotonyDataFromBack && NonMonotonyDataFromBack.data) {
            console.log(
                "NonMonotonyDataFromBack",
                NonMonotonyDataFromBack.data.data,
            );
            setNonMonotonyData(NonMonotonyDataFromBack.data.data);
        }
    }, [NonMonotonyDataFromBack]);

    useEffect(() => {
        if (EmotionalityDataFromBack && EmotionalityDataFromBack.data) {
            console.log(
                "EmotionalityDataFromBack",
                EmotionalityDataFromBack.data.data,
            );
            setEmotionalityData(EmotionalityDataFromBack.data.data);
        }
    }, [EmotionalityDataFromBack]);

    useEffect(() => {
        if (EnergyDataFromBack && EnergyDataFromBack.data) {
            console.log("EnergyDataFromBack", EnergyDataFromBack.data.data);
            setEnergyData(EnergyDataFromBack.data.data);
        }
    }, [EnergyDataFromBack]);

    useEffect(() => {
        if (CongruenceDataFromBack && CongruenceDataFromBack.data) {
            console.log(
                "CongruenceDataFromBack",
                CongruenceDataFromBack.data.data,
            );
            setCongruenceData(CongruenceDataFromBack.data.data);
        }
    }, [CongruenceDataFromBack]);

    useEffect(() => {
        if (ConfidenceDataFromBack && ConfidenceDataFromBack.data) {
            console.log(
                "ConfidenceDataFromBack",
                ConfidenceDataFromBack.data.data,
            );
            setConfidenceData(ConfidenceDataFromBack.data.data);
        }
    }, [ConfidenceDataFromBack]);

    useEffect(() => {
        if (EmotionalArousalDataFromBack && EmotionalArousalDataFromBack.data) {
            console.log(
                "EmotionalArousalDataFromBack",
                EmotionalArousalDataFromBack.data.data,
            );
            setEmotionalArousalData(EmotionalArousalDataFromBack.data.data);
        }
    }, [EmotionalArousalDataFromBack]);

    useEffect(() => {
        if (CommunicativeDataFromBack && CommunicativeDataFromBack.data) {
            console.log(
                "CommunicativeDataFromBack",
                CommunicativeDataFromBack.data.data,
            );
            setCommunicativeData(CommunicativeDataFromBack.data.data);
        }
    }, [CommunicativeDataFromBack]);

    useEffect(() => {
        if (TotalDataFromBack && TotalDataFromBack.data) {
            setTotalData(TotalDataFromBack.data.data);
        }
    }, [TotalDataFromBack]);

    // ----------------------RECOMENDATION----------------------

    const resultDesc = useMemo(() => {
        if (totalData) {
            return {
                connectivityTotal: {
                    value: totalData.values.connectedness,
                    params: {
                        connectivity: 0,
                        informative: 0,
                        unityOfStyle: 0,
                    },
                },
                argumentativenessTotal: {
                    value: totalData.values.argumentativeness,
                    params: {},
                },
                clarityTotal: {
                    value: totalData.values.clarity,
                    params: {
                        clarity: 0,
                        eloquence: 0,
                        expressiveness: 0,
                    },
                },
                dynamismTotal: {
                    value: totalData.values.dynamism,
                    params: {
                        energy: 0,
                        nonMonotony: 0,
                        emotionality: 0,
                    },
                },
                persuasivenessTotal: {
                    value: totalData.values.persuasiveness,
                    params: {
                        confidence: 0,
                        emotionalArousal: 0,
                        congruence: 0,
                    },
                },
                communicativeTotal: {
                    value: totalData.values.communicative,
                    params: {},
                },
            };
        } else
            return {
                connectivityTotal: {
                    value: 0,
                    params: {
                        connectivity: 0,
                        informative: 0,
                        unityOfStyle: 0,
                    },
                },
                argumentativenessTotal: {
                    value: 0,
                    params: {},
                },
                clarityTotal: {
                    value: 0,
                    params: {
                        clarity: 0,
                        eloquence: 0,
                        expressiveness: 0,
                    },
                },
                dynamismTotal: {
                    value: 0,
                    params: {
                        energy: 0,
                        nonMonotony: 0,
                        emotionality: 0,
                    },
                },
                persuasivenessTotal: {
                    value: 0,
                    params: {
                        confidence: 0,
                        emotionalArousal: 0,
                        congruence: 0,
                    },
                },
                communicativeTotal: {
                    value: 0,
                    params: {},
                },
            };
    }, [totalData]);

    // -------------------------------------------- VIDEO BLOCK -------------------------------------------- //
    const videoFromBack = useGetVideoByIdQuery(idVideo);
    const [videoURL, setVideoURL] = useState<string>();

    useEffect(() => {
        if (videoFromBack.data && videoFromBack.isSuccess) {
            setVideoURL(videoFromBack.data);
        }
    }, [videoFromBack]);

    return (
        <div className={cnReport()}>
            <div className={cnReport("btn-back")}>
                <span
                    className={cnReport("btn-back-span")}
                    onClick={() => navigate(-1)}
                >
                    <ReactSVG src={arrowLeft} />
                    Назад
                </span>
            </div>

            <div className={cnReport("header")}>
                <div className={cnReport("whiteBlock")}>
                    <div className={cnReport("video-block-video")}>
                        <VideoTimeContext.Provider
                            value={{
                                currentTime,
                                setCurrentTime,
                                isPlaying,
                                setIsPlaying,
                                togglePlay,
                            }}
                        >
                            {videoURL && (
                                <VideoPlayer url={videoURL} controls={true} />
                            )}
                        </VideoTimeContext.Provider>
                    </div>
                    <div className={cnReport("video-block-title")}>
                        {videoInfo ? videoInfo.title : ""}
                    </div>
                    <div className={cnReport("video-block-description")}>
                        {videoInfo
                            ? getPrettyDataTime(videoInfo.upload_date)
                            : ""}{" "}
                        •{" "}
                        {videoInfo
                            ? getPrettyDuration(Number(videoInfo.duration))
                            : ""}{" "}
                        минут
                    </div>
                </div>

                <div className={cnReport("whiteBlock")}>
                    <ColorfulTabs>
                        {!isMainVideo && videoInfo && (
                            <div
                                className={cnReport("width")}
                                title="Личная заметка"
                            >
                                <VideoNotice
                                    idVideo={videoInfo.id}
                                    description={videoInfo.description}
                                    title={videoInfo.title}
                                />
                            </div>
                        )}
                        <div
                            className={cnReport("transrciption")}
                            title="Транскрипция речи"
                        >
                            <VideoTimeContext.Provider
                                value={{
                                    currentTime,
                                    setCurrentTime,
                                    isPlaying,
                                    setIsPlaying,
                                    togglePlay,
                                }}
                            >
                                <SpeechTranscription idVideo={idVideo} />
                            </VideoTimeContext.Provider>
                        </div>
                    </ColorfulTabs>
                </div>
            </div>
            <div className={cnReport("whiteBlock")}>
                <CommonAnalitics idVideo={idVideo} private={isPrivate} />
            </div>

            {totalData && (
                <Tabs type={TYPE_TABS.TEXT_VALUE}>
                    <div
                        className={cnReport("width")}
                        data-title="Связность"
                        data-value={
                            getTotalResult(totalData!.values.connectedness)[2]
                        }
                        color={
                            getTotalResult(totalData!.values.connectedness)[0]
                        }
                    >
                        <div className={cnReport("conclusion-desciption-text")}>
                            Логичная и последовательная связь компонентов
                            выступления между собой, которые служат для передачи
                            определенного сообщения и обеспечивают единое
                            понимание темы выступления у слушателей
                        </div>
                        {connectivityData && (
                            <Dropdown
                                title={"Последовательность"}
                                subtitle={`${statmentHelper(
                                    connectivityData.controversy,
                                )}`}
                                visible={
                                    <MainSubsequence
                                        data={connectivityData.values.map(
                                            (el) =>
                                                convertConnectivityDataLine(el),
                                        )}
                                        startTime={
                                            connectivityData.values[0]
                                                .time_start
                                        }
                                        endTime={
                                            connectivityData.values.at(-1)!
                                                .time_start
                                        }
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <SecondarySubsequence
                                            data={connectivityData.values}
                                            state={""}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {informativeData && (
                            <Dropdown
                                title={"Информативность"}
                                subtitle={`Доля неречевых звуков и слов-паразитов превышает допустимый порог. 
                Не хватает фактов и деталей для подтверждения высказанных аргументов.`}
                                visible={
                                    <InformativScale
                                        informative={
                                            informativeData.informative
                                        }
                                        sounds={informativeData.sounds}
                                        empty={informativeData.empty}
                                        parasite={informativeData.parasite}
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <InformativeGraph
                                            values={informativeData.values}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {unityOfStyleData && (
                            <Dropdown
                                title={"Единство стиля"}
                                subtitle={AddTextUnityOfStyle(
                                    unityOfStyleData.scientific,
                                    unityOfStyleData.official,
                                    unityOfStyleData.publicistic,
                                    unityOfStyleData.colloquial,
                                    unityOfStyleData.artistic,
                                )}
                                visible={
                                    <UnityOfStylScale
                                        scientific={unityOfStyleData.scientific}
                                        artistic={unityOfStyleData.artistic}
                                        official={unityOfStyleData.official}
                                        publicistic={
                                            unityOfStyleData.publicistic
                                        }
                                        colloquial={unityOfStyleData.colloquial}
                                    />
                                }
                                invisible={
                                    <UnityOfStyl
                                        scientific={unityOfStyleData.scientific}
                                        artistic={unityOfStyleData.artistic}
                                        official={unityOfStyleData.official}
                                        publicistic={
                                            unityOfStyleData.publicistic
                                        }
                                        colloquial={unityOfStyleData.colloquial}
                                    />
                                }
                            />
                        )}

                        {isPrivate && (
                            <Recomendation
                                recomendation={
                                    totalData.values
                                        .connectedness_recommendations
                                        ? totalData.values
                                              .connectedness_recommendations
                                        : "Регулярное чтение позволит обогатить лексические знания и начать внимательно анализировать свои мысли и структурировать высказывания таким образом, чтобы они логически связывались между собой"
                                }
                            />
                        )}
                    </div>
                    <div
                        data-title="Аргументированность"
                        className={cnReport("width")}
                        data-value={
                            getTotalResult(
                                totalData!.values.argumentativeness,
                            )[2]
                        }
                        color={
                            getTotalResult(
                                totalData!.values.argumentativeness,
                            )[0]
                        }
                    >
                        <div className={cnReport("conclusion-desciption-text")}>
                            {`Способность выступающего подтверждать свои
                            утверждения обоснованными фактами, доказательствами,
                            примерами и логическими операциями, умение логически
                            связывать свои мысли со свидетельствами и
                            доказательствами.`}
                        </div>
                        {/* {argumentativenessData && ( */}
                        {!argumentativenessData && (
                            <Dropdown
                                title={
                                    "Оригинальность, заимствования и цитирование"
                                }
                                subtitle={
                                    "Отношение параметров относительно общего объема текста."
                                }
                                visible={
                                    <MainOriginally
                                        info={[
                                            {
                                                title: "Оригинальность",
                                                subtitle: "",
                                                result: "",
                                                fill: "linear-gradient(212.08deg, #7C8EB5 0%, #37476A 100%)",
                                                dotfill:
                                                    "linear-gradient(301.36deg, #7C8EB5 -30.27%, #37476A 119.56%)",
                                                shadow: "",
                                                img: lamp,
                                                value: 30,
                                            },
                                            {
                                                title: "Заимствования",
                                                subtitle: "",
                                                result: "",
                                                fill: "linear-gradient(32.08deg, #2477F4 0%, #3A86FA 100%)",
                                                dotfill:
                                                    "linear-gradient(32.08deg, #2477F4 0%, #3A86FA 100%)",
                                                img: caps,
                                                shadow: "-2px 2px 12px rgba(12, 79, 180, 0.45)",
                                                value: 87.4,
                                            },
                                            {
                                                title: "Цитирование",
                                                subtitle: "",
                                                result: "",
                                                fill: "linear-gradient(225deg, #FFB800 0%, #FFB800 0.01%, #FF9900 100%)",
                                                dotfill: "#FFAA00",
                                                img: quote,
                                                shadow: "-2px 2px 12px rgba(219, 153, 20, 0.6)",
                                                value: 66,
                                            },
                                        ]}
                                        // _____________________вернуть после теста ____________________
                                        // positions={[
                                        //     argumentativenessData.originality,
                                        //     argumentativenessData.borrowing,
                                        //     argumentativenessData.citation,
                                        // ]}
                                        positions={[
                                            argumentativenessData1.data
                                                .originality,
                                            argumentativenessData1.data
                                                .borrowing,
                                            argumentativenessData1.data
                                                .citation,
                                        ]}
                                    />
                                }
                                invisible={
                                    // _____________________вернуть после теста ____________________
                                    <></>
                                    // <SecondaryOriginally
                                    //     breakdown={
                                    //         // argumentativenessData.values
                                    //         argumentativenessData1.data.values
                                    //     }
                                    //     state={""}
                                    // />
                                }
                            />
                        )}
                        {isPrivate && (
                            <Recomendation
                                recomendation={
                                    totalData.values
                                        .argumentativeness_recommendations
                                        ? totalData.values
                                              .argumentativeness_recommendations
                                        : // ПОСЛЕ ПИЛОТА ВЕРНУТЬ
                                          // : "Важно приводить не только аргументы “за” (за свой тезис), но и аргументы “против”. Они должны убеждать аудиторию в том, что аргументы, приводимые в поддержку критикуемого Вами тезиса, слабые и не выдерживают критики."
                                          `С целью недопущения попадания информации, возможно носящей характер коммерческой тайны, в систему Антиплагиат на время проведения бета-тестирования параметры "оригинальность", "заимствования" и "цитирования" временно не определяются.`
                                }
                            />
                        )}
                    </div>
                    <div
                        data-title="Ясность"
                        className={cnReport("width")}
                        data-value={
                            getTotalResult(totalData!.values.clarity)[2]
                        }
                        color={getTotalResult(totalData!.values.clarity)[0]}
                    >
                        <div className={cnReport("conclusion-desciption-text")}>
                            {`Способность выразить свои мысли в ясной, доходчивой
                            и понятной форме.`}
                        </div>
                        {clarityData && videoInfo && videoInfo!.duration && (
                            <Dropdown
                                title={"Четкость речи"}
                                subtitle={clarityData.expressiveness}
                                visible={
                                    <MainDefinition
                                        data={clarityData.values.map((el) =>
                                            convertClarityDataLine(el),
                                        )}
                                        startTime={
                                            clarityData.values[0].time_start
                                        }
                                        endTime={+videoInfo!.duration}
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <SecondaryDefinition
                                            data={clarityData.values}
                                            counts={[
                                                clarityData.basic,
                                                clarityData.sounds,
                                                clarityData.trembling,
                                            ]}
                                            state={""}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {eloquenceData && (
                            <Dropdown
                                title={"Красноречивость"}
                                subtitle={AddTextEloquence(
                                    eloquenceData.values.parasitic_words,
                                    Math.ceil(
                                        (eloquenceData.values.parasitic_words /
                                            10 +
                                            eloquenceData.values.short_words) *
                                            2.5 *
                                            25,
                                    ),
                                    eloquenceData.values.parasitic_words,
                                    Math.ceil(
                                        ((eloquenceData.values.parasitic_words /
                                            10 +
                                            eloquenceData.values
                                                .short_sentences) *
                                            2,
                                        5),
                                    ),
                                    eloquenceData.values.short_words,
                                    eloquenceData.values.action_words,
                                )}
                                visible={<Eloquence data={eloquenceData} />}
                                invisible={
                                    <EloquenceText
                                        data={eloquenceData.values}
                                    />
                                }
                            />
                        )}
                        {/* TO DO: DELETE ALL WARNING IN CONSOLE */}

                        {expressivenessData &&
                            videoInfo &&
                            videoInfo!.duration && (
                                <Dropdown
                                    title={"Экспрессивность"}
                                    subtitle={
                                        expressivenessData.total_expressiveness >=
                                        0.5
                                            ? "Наблюдается повышенная выразительность речи"
                                            : "Наблюдается снижение выразительности речи"
                                    }
                                    visible={
                                        <MainExpressiveness
                                            data={expressivenessData.values.map(
                                                (el) =>
                                                    convertExpressivenessDataLine(
                                                        el,
                                                    ),
                                            )}
                                            startTime={
                                                expressivenessData.values[0]
                                                    .time_start
                                            }
                                            endTime={+videoInfo!.duration}
                                        />
                                    }
                                    invisible={
                                        <VideoTimeContext.Provider
                                            value={{
                                                currentTime,
                                                setCurrentTime,
                                                isPlaying,
                                                setIsPlaying,
                                                togglePlay,
                                            }}
                                        >
                                            <SecondaryExpressiveness
                                                data={expressivenessData.values}
                                                graphs={["злость", "радость"]}
                                                state={""}
                                            />
                                        </VideoTimeContext.Provider>
                                    }
                                />
                            )}

                        {isPrivate && (
                            <Recomendation
                                recomendation={
                                    totalData.values.clarity_recommendations
                                        ? totalData.values
                                              .clarity_recommendations
                                        : "Регулярно расширяйте свой словарный запас, поскольку это поможет Вам в выборе более точных и выразительных слов для передачи своих мыслей и эмоций."
                                }
                            />
                        )}
                    </div>
                    <div
                        data-title="Динамизм"
                        className={cnReport("width")}
                        data-value={
                            getTotalResult(totalData!.values.dynamism)[2]
                        }
                        color={getTotalResult(totalData!.values.dynamism)[0]}
                    >
                        <div className={cnReport("conclusion-desciption-text")}>
                            {`Способность выражать свои мысли и идеи с помощью
                            энергичного и живого выступления, проявление
                            активности, энтузиазма в речи.`}
                        </div>
                        {nonMonotonyData && (
                            <Dropdown
                                title={"Немонотонность"}
                                subtitle={`Уровни параметров немонотонности.`}
                                visible={
                                    <MainNonMonotony
                                        info={[
                                            {
                                                title: "Темп речи",
                                                subtitle: NonMonotonyTempHelper(
                                                    nonMonotonyData["h-temp"],
                                                ).subtitle,
                                                result: NonMonotonyTempHelper(
                                                    nonMonotonyData["h-temp"],
                                                ).result,
                                                fill: "#2477F4",
                                                dotfill: "#2477F4",
                                                shadow: "0.663492px 0.663492px 3.4619px #2477F4",
                                                img: "",
                                                value:
                                                    (nonMonotonyData["h-temp"] /
                                                        250) *
                                                    100,
                                            },
                                            {
                                                title: "Громкость голоса",
                                                subtitle:
                                                    NonMonotonyVolumeHelper(
                                                        nonMonotonyData[
                                                            "h-volume"
                                                        ],
                                                    ).subtitle,
                                                result: NonMonotonyVolumeHelper(
                                                    nonMonotonyData["h-volume"],
                                                ).result,
                                                fill: "#F35B60",
                                                dotfill: "#F35B60",
                                                img: "",
                                                shadow: "0.663492px 0.663492px 3.4619px #F35B60",
                                                value:
                                                    (nonMonotonyData[
                                                        "h-volume"
                                                    ] /
                                                        120) *
                                                    100,
                                            },
                                            {
                                                title: "Диапазон изменения тона",
                                                subtitle: NonMonotonyToneHelper(
                                                    nonMonotonyData["h-tone"],
                                                ).subtitle,
                                                result: NonMonotonyToneHelper(
                                                    nonMonotonyData["h-tone"],
                                                ).result,
                                                fill: "#FFB800",
                                                dotfill: "#FFB800",
                                                img: "",
                                                shadow: "0.663492px 0.663492px 7.9619px #FFB800",
                                                value:
                                                    nonMonotonyData["h-tone"] *
                                                    100,
                                            },
                                        ]}
                                    />
                                }
                                invisible={
                                    // сюда надо добавить data
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <SecondaryNonMonotony
                                            data={nonMonotonyData.values}
                                            averages={[
                                                (nonMonotonyData["h-temp"] /
                                                    250) *
                                                    100,
                                                (nonMonotonyData["h-volume"] /
                                                    120) *
                                                    100,
                                                nonMonotonyData["h-tone"],
                                            ]}
                                            graphs={[
                                                {
                                                    link: "Темп речи",
                                                },
                                                {
                                                    link: "Громкость голоса",
                                                },
                                                {
                                                    link: "Нормированный тон речи",
                                                },
                                            ]}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {emotionalityData && (
                            <Dropdown
                                title={"Эмоциональность"}
                                subtitle={`Передача слушателям позитивной эмоциональной окраски и воодушевления.`}
                                visible={
                                    <Emotionality
                                        total={emotionalityData.total}
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <EmotionalScale
                                            values={emotionalityData.values}
                                            endTime={+videoInfo!.duration}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {energyData && (
                            <Dropdown
                                title={"Энергичность"}
                                subtitle={textForEnergySmile(
                                    energyData.total_energy,
                                )}
                                visible={
                                    <EnergySmile
                                        energy={energyData.total_energy}
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <SecondaryEnergy
                                            data={energyData.values}
                                            average={0.5}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {isPrivate && (
                            <Recomendation
                                recomendation={
                                    totalData.values.dynamism_recommendations
                                        ? totalData.values
                                              .dynamism_recommendations
                                        : "Динамизм касается в первую очередь интонации речи и связана с эмоциональностью, разнообразием интонационного оформления, отсутствием монотонности, точностью интонационной передачи оратором своей мысли, правильной расстановкой логических ударений и пауз, точностью передачи подтекста. Следует голосом, интонацией подчеркивать основную мысль, делать паузы до и после важных мыслей."
                                }
                            />
                        )}
                    </div>

                    <div
                        data-title="Убедительность"
                        className={cnReport("width")}
                        data-value={
                            getTotalResult(totalData!.values.persuasiveness)[2]
                        }
                        color={
                            getTotalResult(totalData!.values.persuasiveness)[0]
                        }
                    >
                        <div className={cnReport("conclusion-desciption-text")}>
                            {
                                "Способность выступающего эффективно выражать свои мысли, оказывать влияние на аудиторию и уверить ее в правильности своих аргументов и доказательств."
                            }
                        </div>
                        {congruenceData && (
                            <Dropdown
                                title={"Конгруэнтность"}
                                subtitle={`Эмоции в видеоканале не согласованы.`}
                                visible={
                                    <Congruence
                                        diameter={congruenceData.diameter}
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <CongruenceScale
                                            A_T={congruenceData.values["A-T"]}
                                            A_V={congruenceData.values["A-V"]}
                                            V_T={congruenceData.values["V-T"]}
                                            endTime={+videoInfo!.duration}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {confidenceData && videoInfo && videoInfo!.duration && (
                            <Dropdown
                                title={"Уверенность"}
                                subtitle={judgmentHelper(
                                    confidenceData.uncertainty,
                                )}
                                visible={
                                    <MainConfidence
                                        data={confidenceData.values}
                                        endTime={+videoInfo!.duration}
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <SecondaryConfidence
                                            data={confidenceData.values}
                                            average={
                                                100 -
                                                confidenceData.average_value *
                                                    100
                                            }
                                            state={""}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}

                        {emotionalArousalData && (
                            <Dropdown
                                title={"Эмоциональное возбуждение"}
                                subtitle={``}
                                visible={
                                    <EmotionalArousal
                                        emotional_arousal={
                                            emotionalArousalData.values
                                                .emotional_arousal
                                        }
                                    />
                                }
                                invisible={
                                    <SecondaryEmotionalArousal
                                        info={[
                                            {
                                                title: "Коэффицент Трейгера",
                                                subtitle:
                                                    "указывает на склонность к активности, рефлексии и созерцательности.",
                                                result:
                                                    !emotionalArousalData.values
                                                        .trager_coefficient ||
                                                    emotionalArousalData.values
                                                        .trager_coefficient < 0
                                                        ? 0
                                                        : emotionalArousalData
                                                              .values
                                                              .trager_coefficient >
                                                          1
                                                        ? 1
                                                        : emotionalArousalData
                                                              .values
                                                              .trager_coefficient,
                                                fill: ["#FFDFE1", "#ABFFBE"],
                                                limit: 0.85,
                                            },
                                            {
                                                title: "Коэффицент определенности действия",
                                                subtitle:
                                                    "характеризует уровень социализированности, синтаксической завершенности высказывания.",
                                                result:
                                                    !emotionalArousalData.values
                                                        .action_certainty_factor ||
                                                    emotionalArousalData.values
                                                        .action_certainty_factor <
                                                        0
                                                        ? 0
                                                        : emotionalArousalData
                                                              .values
                                                              .action_certainty_factor >
                                                          1
                                                        ? 1
                                                        : emotionalArousalData
                                                              .values
                                                              .action_certainty_factor,
                                                fill: ["#FFDFE1", "#ABFFBE"],
                                                limit: 0.85,
                                            },
                                            {
                                                title: "Коэффицент агрессивности",
                                                subtitle:
                                                    "свидетельствует о готовности к немедленным действиям.",
                                                result:
                                                    !emotionalArousalData.values
                                                        .aggressiveness_coefficient ||
                                                    emotionalArousalData.values
                                                        .aggressiveness_coefficient <
                                                        0
                                                        ? 0
                                                        : emotionalArousalData
                                                              .values
                                                              .aggressiveness_coefficient >
                                                          1
                                                        ? 1
                                                        : emotionalArousalData
                                                              .values
                                                              .aggressiveness_coefficient,
                                                fill: ["#ABFFBE", "#FFDFE1"],
                                                limit: 0.6,
                                            },
                                        ]}
                                    />
                                }
                            />
                        )}
                        {isPrivate && (
                            <Recomendation
                                recomendation={
                                    totalData.values
                                        .persuasiveness_recommendations
                                        ? totalData.values
                                              .persuasiveness_recommendations
                                        : "В случае, если Вы ставите себе целью убедить людей в чем-либо, либо Вам надо побудить людей в аудитории к определенным действиям, то Вам лучше всего сконцентрироваться на подробном анализе аудитории (чтобы понять, какие именно факторы повлияют на позицию аудитории), на содержании и структуре презентации с продумыванием аргументов и примеров (чтобы речь была логичной и убедительной) и на тщательной подготовке наглядных пособий (это усилит Ваше влияние на людей)."
                                }
                            />
                        )}
                    </div>
                    <div
                        data-title="Коммуникативная норма"
                        data-value={
                            getTotalResult(totalData!.values.communicative)[2]
                        }
                        color={
                            getTotalResult(totalData!.values.communicative)[0]
                        }
                        className={cnReport("width")}
                    >
                        <div className={cnReport("conclusion-desciption-text")}>
                            {`Умение правильно и эффективно использовать язык и
                            другие коммуникативные инстументы для того, чтобы
                            эффективно общаться с аудиторией и передавать свои
                            мысли и идеи.`}
                        </div>
                        {communicativeData && (
                            <Dropdown
                                title={
                                    "Слова паразиты, когнитивные искажения, агрессивность"
                                }
                                subtitle={`Умение правильно и эффективно использовать язык и другие коммуникативные инстументы для того, чтобы эффективно общаться с аудиторией и передавать свои мысли и идеи.`}
                                visible={
                                    <CommunicativeNorm
                                        aggression={
                                            communicativeData.aggression
                                        }
                                        cognitive_distortion={
                                            communicativeData.cognitive_distortion
                                        }
                                        filler_words={
                                            communicativeData.filler_words
                                        }
                                    />
                                }
                                invisible={
                                    <VideoTimeContext.Provider
                                        value={{
                                            currentTime,
                                            setCurrentTime,
                                            isPlaying,
                                            setIsPlaying,
                                            togglePlay,
                                        }}
                                    >
                                        <SecondaryDefeat
                                            breakdown={communicativeData.values}
                                            state={""}
                                        />
                                    </VideoTimeContext.Provider>
                                }
                            />
                        )}
                        {isPrivate && (
                            <Recomendation
                                recomendation={
                                    totalData.values
                                        .communicative_recommendations
                                        ? totalData.values
                                              .communicative_recommendations
                                        : "Помните, нарушение коммуникативных норм обычно не остается незамеченным. В зависимости от того, насколько грубым было это нарушение, наказания выражаются в отказе адресата от коммуникации вообще, в прерывании общения, в недостижении цели общения."
                                }
                            />
                        )}
                    </div>
                </Tabs>
            )}

            {isPrivate && (
                <div className={cnReport("whiteBlock")}>
                    <div className={cnReport("col")}>
                        <div className={cnReport("row")}>
                            <div className={cnReport("conclusion-title")}>
                                <span
                                    className={cnReport(
                                        "conclusion-title-icon",
                                    )}
                                >
                                    <ReactSVG src={noteIcon} />
                                </span>
                                <span
                                    className={cnReport(
                                        "conclusion-title-text",
                                    )}
                                >
                                    Вывод
                                </span>
                            </div>
                        </div>

                        <div className={cnReport("conclusion-desciption")}>
                            <div
                                className={cnReport(
                                    "conclusion-desciption-text",
                                )}
                            >
                                {/* заменить общий вывод */}
                                {resultDesc && getTotalDesc(resultDesc)}

                                {/* {`Задача организации, в особенности же понимание сути
                            ресурсосберегающих технологий требует определения и
                            уточнения соответствующих условий активизации. Как
                            уже неоднократно упомянуто, интерактивные прототипы
                            представляют собой не что иное, как квинтэссенцию
                            победы маркетинга над разумом и должны быть в равной
                            степени предоставлены сами себе. Кстати, стремящиеся
                            вытеснить традиционное производство, нанотехнологии
                            лишь добавляют фракционных разногласий и призваны к
                            ответу.`} */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
