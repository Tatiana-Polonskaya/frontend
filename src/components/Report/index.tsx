import { cn } from "@bem-react/classname";

import Tabs, { TYPE_TABS } from "../Tabs";

import videoPic from "./assets/video.png";

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

import totalData from "../../plugs/total.json";

import { getTotalResult } from "./helpers";

import ColorfulTabs from "../ColorfulTabs";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";
import SpeechTranscription from "../SpeechTranscription";
import VideoNotice from "../VideoNotice";
import { useNavigate, useParams } from "react-router-dom";

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

import {
    useGetArgumentativenessByIdQuery,
    useGetClarityByIdQuery,
    useGetCommunicativeByIdQuery,
    useGetConfidenceByIdQuery,
    useGetCongruenceByIdQuery,
    useGetConnectivityByIdQuery,
    useGetEloquenceByIdQuery,
    useGetEmotionalArousalByIdQuery,
    useGetEmotionalityByIdQuery,
    useGetEnergyByIdQuery,
    useGetExpressivenessByIdQuery,
    useGetInformativeByIdQuery,
    useGetNonMonotonyByIdQuery,
    useGetTotalByIdQuery,
    useGetUnityOfStyleByIdQuery,
} from "../../store/api/report";

import { InformativeJSON } from "../../models/graph/informative";
import Dropdown from "../Dropdown";
import {
    UnityOfStyleDataItem,
    UnityOfStyleJSON,
} from "../../models/graph/unity_of_style";

import { ConnectivityJSON } from "../../models/graph/connectivity";
import { ArgumentativenessJSON } from "../../models/graph/argumentativeness";
import { ClarityJSON } from "../../models/graph/clarity";
import { EloquenceJSON } from "../../models/graph/eloquence";
import { ExpressivenessJSON } from "../../models/graph/expressiveness";
import { NonMonotonyJSON } from "../../models/graph/monotony";
import { EmotionalityJSON } from "../../models/graph/emotionality";
import { EnergyJSON } from "../../models/graph/energy";
import { CongruenceJSON } from "../../models/graph/congruence";
import { ConfidenceJSON } from "../../models/graph/confidence";
import { EmotionalArousalJSON } from "../../models/graph/emotional_arousal";
import { CommunicativeJSON } from "../../models/graph/communicative";

import noteIcon from "./assets/note.svg";
import arrowLeft from "./assets/arrowLeft.svg";
import "./style.scss";
import { TotalGraphJSON } from "../../models/graph/total";
import { useGetVideoByIdQuery, useGetVideoInfoByIdQuery } from "../../store/api/userVideo";
import { IVideoInfo } from "../../models/video";
import { getPrettyDuration } from "../PreviewBlock";
import ReactPlayer from "react-player";
import VideoPlayer, { getPrettyDataTime } from "../VideoPlayer";

// provider for setting the current time in graphs and others elements accoding to the video element
export const VideoTimeContext = createContext({
    currentTime: "00:00",
    setCurrentTime: (() => {}) as Dispatch<SetStateAction<string>>,
});

export default function AnalysisReport() {
    const cnReport = cn("AnalysisReport");

    const params = useParams();
    const idVideo = params.id ? params.id : "ec9a839f-55c4-4504-9fdf-e6ff3c49766f"; 
    
    // common info about video: title, date, duration
    const {data} = useGetVideoInfoByIdQuery(idVideo);
    const videoInfo = data?.data as IVideoInfo;

    const navigate = useNavigate();

    // state for video playing
    const [currentTime, setCurrentTime] = useState("00:00");

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
    const ConnectivityDataFromBack = useGetConnectivityByIdQuery(idVideo);
    const InformativeDataFromBack = useGetInformativeByIdQuery(idVideo);
    const UnityOfStyleDataFromBack = useGetUnityOfStyleByIdQuery(idVideo);
    const ArgumentativenessDataFromBack =
        useGetArgumentativenessByIdQuery(idVideo);
    const ClarityDataFromBack = useGetClarityByIdQuery(idVideo);
    const EloquenceDataFromBack = useGetEloquenceByIdQuery(idVideo);
    const ExpressivenessDataFromBack = useGetExpressivenessByIdQuery(idVideo);
    const NonMonotonyDataFromBack = useGetNonMonotonyByIdQuery(idVideo);
    const EmotionalityDataFromBack = useGetEmotionalityByIdQuery(idVideo);
    const EnergyDataFromBack = useGetEnergyByIdQuery(idVideo);
    const CongruenceDataFromBack = useGetCongruenceByIdQuery(idVideo);
    const ConfidenceDataFromBack = useGetConfidenceByIdQuery(idVideo);
    const EmotionalArousalDataFromBack =
        useGetEmotionalArousalByIdQuery(idVideo);
    const CommunicativeDataFromBack = useGetCommunicativeByIdQuery(idVideo);
    const TotalDataFromBack = useGetTotalByIdQuery(idVideo);

    useEffect(() => {
        if (ConnectivityDataFromBack && ConnectivityDataFromBack.data)
            setConnectivityData(ConnectivityDataFromBack.data.data);
    }, [ConnectivityDataFromBack]);

    useEffect(() => {
        if (InformativeDataFromBack && InformativeDataFromBack.data)
            setInformativeData(InformativeDataFromBack.data.data);
    }, [InformativeDataFromBack]);

    useEffect(() => {
        if (
            UnityOfStyleDataFromBack &&
            UnityOfStyleDataFromBack.data &&
            UnityOfStyleDataFromBack.data.data!.values
        )
            setUnityOfStyleData(UnityOfStyleDataFromBack.data.data!.values);
    }, [UnityOfStyleDataFromBack]);

    useEffect(() => {
        if (ArgumentativenessDataFromBack && ArgumentativenessDataFromBack.data)
            setArgumentativenessData(ArgumentativenessDataFromBack.data.data);
    }, [ArgumentativenessDataFromBack]);

    useEffect(() => {
        if (ClarityDataFromBack && ClarityDataFromBack.data)
            setClarityData(ClarityDataFromBack.data.data);
    }, [ClarityDataFromBack]);

    useEffect(() => {
        if (EloquenceDataFromBack && EloquenceDataFromBack.data)
            setEloquenceData(EloquenceDataFromBack.data.data);
    }, [EloquenceDataFromBack]);

    useEffect(() => {
        if (ExpressivenessDataFromBack && ExpressivenessDataFromBack.data)
            setExpressivenessData(ExpressivenessDataFromBack.data.data);
    }, [ExpressivenessDataFromBack]);

    useEffect(() => {
        if (NonMonotonyDataFromBack && NonMonotonyDataFromBack.data)
            setNonMonotonyData(NonMonotonyDataFromBack.data.data);
    }, [NonMonotonyDataFromBack]);

    useEffect(() => {
        if (EmotionalityDataFromBack && EmotionalityDataFromBack.data)
            setEmotionalityData(EmotionalityDataFromBack.data.data);
    }, [EmotionalityDataFromBack]);

    useEffect(() => {
        if (EnergyDataFromBack && EnergyDataFromBack.data)
            setEnergyData(EnergyDataFromBack.data.data);
    }, [EnergyDataFromBack]);

    useEffect(() => {
        if (CongruenceDataFromBack && CongruenceDataFromBack.data)
            setCongruenceData(CongruenceDataFromBack.data.data);
    }, [CongruenceDataFromBack]);

    useEffect(() => {
        if (ConfidenceDataFromBack && ConfidenceDataFromBack.data)
            setConfidenceData(ConfidenceDataFromBack.data.data);
    }, [ConfidenceDataFromBack]);

    useEffect(() => {
        if (EmotionalArousalDataFromBack && EmotionalArousalDataFromBack.data)
            setEmotionalArousalData(EmotionalArousalDataFromBack.data.data);
    }, [EmotionalArousalDataFromBack]);

    useEffect(() => {
        if (CommunicativeDataFromBack && CommunicativeDataFromBack.data)
            setCommunicativeData(CommunicativeDataFromBack.data.data);
    }, [CommunicativeDataFromBack]);

    useEffect(() => {
        if (TotalDataFromBack && TotalDataFromBack.data)
            setTotalData(TotalDataFromBack.data.data);
    }, [TotalDataFromBack]);

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
                    <div className={cnReport("video-block")}>
                        <VideoPlayer url={`/api/video/${idVideo}`}/>
                        {/* <ReactPlayer
                                className={cnReport("video")}
                                width={"100%"}
                                height="100%"
                                url={`/api/video/${idVideo}`}
                                controls={true}
                        /> */}

                        <div className={cnReport("video-block-title")}>
                            {videoInfo ? videoInfo.title: ""}
                        </div>
                        <div className={cnReport("video-block-description")}>
                            {videoInfo ? getPrettyDataTime(videoInfo.upload_date): ""} • {videoInfo?getPrettyDuration(Number(videoInfo.duration)): ""} минут
                        </div>
                    </div>
                </div>

                <div className={cnReport("whiteBlock")}>
                    <div className={cnReport("video-block")}>
                        <ColorfulTabs>
                            <div
                                className={cnReport("width")}
                                title="Личная заметка"
                            >
                                <VideoNotice description="" />
                            </div>
                            <div
                                className={cnReport("width")}
                                title="Транскрипция речи"
                            >
                                <VideoTimeContext.Provider
                                    value={{ currentTime, setCurrentTime }}
                                >
                                    <SpeechTranscription idVideo={idVideo}/>
                                </VideoTimeContext.Provider>
                            </div>
                        </ColorfulTabs>
                    </div>
                </div>
            </div>

            <div className={cnReport("whiteBlock")}>
                <CommonAnalitics idVideo={idVideo} />
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
                        {connectivityData && (
                            <Dropdown
                                title={"Последовательность"}
                                subtitle={`Потеря логической связи в ...${"*"} высказываниях`}
                                visible={
                                    <MainSubsequence
                                        data={connectivityData.values.map(
                                            (el) =>
                                                convertConnectivityDataLine(el)
                                        )}
                                        startTime={
                                            connectivityData.values[0]
                                                .time_start
                                        }
                                        endTime={
                                            connectivityData.values[
                                                connectivityData.values.length -
                                                    1
                                            ].time_end
                                        }
                                    />
                                }
                                invisible={
                                    <SecondarySubsequence
                                        data={connectivityData.values}
                                        state={""}
                                    />
                                }
                            />
                        )}
                        {informativeData && (
                            <Dropdown
                                title={"Информативность"}
                                subtitle={`Доля неречевых звуков и слов-паразитов превышает допустимый порог. 
                Не хватает фактов и деталей для подтверждения высказанных аргументов.`}
                                visible={
                                    informativeData && (
                                        <InformativScale
                                            informative={
                                                informativeData.informative
                                            }
                                            sounds={informativeData.sounds}
                                            without_confirmation={
                                                informativeData.empty
                                            }
                                            parasite={informativeData.parasite}
                                        />
                                    )
                                }
                                invisible={
                                    informativeData && (
                                        <InformativeGraph
                                            values={informativeData.values}
                                        />
                                    )
                                }
                            />
                        )}

                        {unityOfStyleData && (
                            <Dropdown
                                title={"Единство стиля"}
                                subtitle={`Ярко выражен публицестический стиль, но преобладание других превышает рекомендованное значение.`}
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
                        {/* <Recomendation /> */}
                    </div>
                    <div
                        data-title="Аргументированность"
                        className={cnReport("width")}
                        data-value={
                            getTotalResult(
                                totalData!.values.argumentativeness
                            )[2]
                        }
                        color={
                            getTotalResult(
                                totalData!.values.argumentativeness
                            )[0]
                        }
                    >
                        {argumentativenessData && (
                            <Dropdown
                                title={"Аргументированность"}
                                subtitle={"Аргументированность"}
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
                                        positions={[
                                            argumentativenessData.originality,
                                            argumentativenessData.borrowing,
                                            argumentativenessData.citation,
                                        ]}
                                    />
                                }
                                invisible={
                                    <SecondaryOriginally
                                        breakdown={argumentativenessData.values}
                                        state={""}
                                    />
                                }
                            />
                        )}
                        {/* <Recomendation /> */}
                    </div>
                    <div
                        data-title="Ясность"
                        className={cnReport("width")}
                        data-value={
                            getTotalResult(totalData!.values.clarity)[2]
                        }
                        color={getTotalResult(totalData!.values.clarity)[0]}
                    >
                        {clarityData && (
                            <Dropdown
                                title={"Четкость речи"}
                                subtitle={`Присутствуют лишние звуковые помехи.`}
                                visible={
                                    <MainDefinition
                                        data={clarityData.values.map((el) =>
                                            convertClarityDataLine(el)
                                        )}
                                        startTime={
                                            clarityData.values[0].time_start
                                        }
                                        endTime={
                                            clarityData.values[
                                                clarityData.values.length - 1
                                            ].time_end
                                        }
                                    />
                                }
                                invisible={
                                    <SecondaryDefinition
                                        data={clarityData.values}
                                        counts={[
                                            clarityData.basic,
                                            clarityData.sounds,
                                            clarityData.trembling,
                                        ]}
                                        state={""}
                                    />
                                }
                            />
                        )}
                        {eloquenceData && (
                            <Dropdown
                                title={"Красноречивость"}
                                subtitle={`Найдено излишнее количество слов-паразитов.`}
                                visible={<Eloquence data={eloquenceData} />}
                                invisible={
                                    <EloquenceText data={eloquenceData} />
                                }
                            />
                        )}
                        {expressivenessData && (
                            <Dropdown
                                title={"Экспрессивность"}
                                subtitle={`Какой-то вывод в мини-форме`}
                                visible={
                                    <MainExpressiveness
                                        data={expressivenessData.values.map(
                                            (el) =>
                                                convertExpressivenessDataLine(
                                                    el
                                                )
                                        )}
                                        startTime={
                                            expressivenessData.values[0]
                                                .time_start
                                        }
                                        endTime={
                                            expressivenessData.values[
                                                expressivenessData.values
                                                    .length - 1
                                            ].time_start
                                        }
                                    />
                                }
                                invisible={
                                    <SecondaryExpressiveness
                                        data={expressivenessData.values}
                                        graphs={["злость", "радость"]}
                                        state={""}
                                    />
                                }
                            />
                        )}
                        {/* <Recomendation /> */}
                    </div>
                    <div
                        data-title="Динамизм"
                        className={cnReport("width")}
                        data-value={
                            getTotalResult(totalData!.values.dynamism)[2]
                        }
                        color={getTotalResult(totalData!.values.dynamism)[0]}
                    >
                        {/* -------------------------- DONT WORK - WHY? ------------------------------------------------------------------------------- */}
                        {/* {nonMonotonyData && (
                        <Dropdown
                            title={"Немонотонность"}
                            subtitle={`Уровни параметров немонотонности.`}
                            visible={
                                <MainNonMonotony
                                    info={[
                                        {
                                            title: "Темп речи",
                                            subtitle:
                                                "Темп речи средний, ровный и без пауз.",
                                            result: "норма",
                                            fill: "#2477F4",
                                            dotfill: "#2477F4",
                                            shadow: "0.663492px 0.663492px 3.4619px #2477F4",
                                            img: "",
                                            value: 10,
                                        },
                                        {
                                            title: "Громкость голоса",
                                            subtitle:
                                                "Выглядит так, как будто Вы проявляете агрессию.",
                                            result: "Слишком громко",
                                            fill: "#F35B60",
                                            dotfill: "#F35B60",
                                            img: "",
                                            shadow: "0.663492px 0.663492px 3.4619px #F35B60",
                                            value: 10,
                                        },
                                        {
                                            title: "Диапазон изменения тона",
                                            subtitle:
                                                "Однообразие звучания притупляет восприятие.",
                                            result: "Маленький",
                                            fill: "#FFB800",
                                            dotfill: "#FFB800",
                                            img: "",
                                            shadow: "0.663492px 0.663492px 7.9619px #FFB800",
                                            value: 10,
                                        },
                                    ]}
                                />
                            }
                            invisible={
                                // сюда надо добавить data
                                <SecondaryNonMonotony
                                    graphs={[
                                        {
                                            link: "Темп речи",
                                        },
                                        {
                                            link: "Громкость голоса",
                                        },
                                        {
                                            link: "Тон речи",
                                        },
                                    ]}
                                />
                            }
                        />
                    )} */}
                        {emotionalityData && (
                            <Dropdown
                                title={"Эмоциональность"}
                                subtitle={`Доля ваших эмоций в выступлении.`}
                                visible={
                                    <Emotionality
                                        total={emotionalityData.total}
                                    />
                                }
                                invisible={
                                    <EmotionalScale
                                        values={emotionalityData.values}
                                    />
                                }
                            />
                        )}
                        {energyData && (
                            <Dropdown
                                title={"Энергичность"}
                                subtitle={`Ваше выступление недостаточно энергичное.`}
                                visible={
                                    <EnergySmile
                                        energy={energyData.total_energy}
                                    />
                                }
                                invisible={
                                    <SecondaryEnergy data={energyData.values} />
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
                                    <CongruenceScale
                                        A_T={congruenceData.values["A-T"]}
                                        A_V={congruenceData.values["A-V"]}
                                        V_T={congruenceData.values["V-T"]}
                                    />
                                }
                            />
                        )}
                        {confidenceData && (
                            <Dropdown
                                title={"Уверенность"}
                                subtitle={`Зафиксирована неуверенность в суждениях ***${2}раз/а`}
                                visible={
                                    <MainConfidence
                                        data={confidenceData.values}
                                    />
                                }
                                invisible={
                                    <SecondaryConfidence
                                        data={confidenceData.values}
                                        average={
                                            100 - confidenceData.average_value
                                        }
                                        state={""}
                                    />
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
                                                    "Отношение количества глаголов к количеству прилагательных в единице текста должно быть близко к 1.",
                                                result: emotionalArousalData
                                                    .values.trager_coefficient,
                                                fill: ["#FFDFE1", "#ABFFBE"],
                                                limit: 0.85,
                                            },
                                            {
                                                title: "Коэффицент определенности действия",
                                                subtitle:
                                                    "Отношение количества глаголов к количеству существительных в единице текста должно быть близко к 1.",
                                                result: emotionalArousalData
                                                    .values
                                                    .action_certainty_factor,
                                                fill: ["#FFDFE1", "#ABFFBE"],
                                                limit: 0.85,
                                            },
                                            {
                                                title: "Коэффицент агрессивности",
                                                subtitle:
                                                    "Отношение количества глаголов и глагольных форм к общему количеству всех слов не должно превышать 0,6.",
                                                result: emotionalArousalData
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
                    </div>
                    <div
                        data-title="Коммуникативные нормы"
                        data-value={
                            getTotalResult(totalData!.values.communicative)[2]
                        }
                        color={
                            getTotalResult(totalData!.values.communicative)[0]
                        }
                        className={cnReport("width")}
                    >
                        {communicativeData && (
                            <Dropdown
                                title={
                                    "Слова паразиты, когнитивные искажения, агрессивность"
                                }
                                subtitle={``}
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
                                    <SecondaryDefeat
                                        breakdown={communicativeData.values}
                                        state={""}
                                    />
                                }
                            />
                        )}
                    </div>
                </Tabs>
            )}

            <div className={cnReport("whiteBlock")}>
                <div className={cnReport("col")}>
                    <div className={cnReport("row")}>
                        <div className={cnReport("conclusion-title")}>
                            <span className={cnReport("conclusion-title-icon")}>
                                <ReactSVG src={noteIcon} />
                            </span>
                            <span className={cnReport("conclusion-title-text")}>
                                Вывод
                            </span>
                        </div>
                    </div>

                    <div className={cnReport("conclusion-desciption")}>
                        <div className={cnReport("conclusion-desciption-text")}>
                            Задача организации, в особенности же понимание сути
                            ресурсосберегающих технологий требует определения и
                            уточнения соответствующих условий активизации. Как
                            уже неоднократно упомянуто, интерактивные прототипы
                            представляют собой не что иное, как квинтэссенцию
                            победы маркетинга над разумом и должны быть в равной
                            степени предоставлены сами себе. Кстати, стремящиеся
                            вытеснить традиционное производство, нанотехнологии
                            лишь добавляют фракционных разногласий и призваны к
                            ответу.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
