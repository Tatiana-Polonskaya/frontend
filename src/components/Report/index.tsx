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
    ISectionRecomendation,
    argumentativenessRecomendation,
    communicativeRecomendation,
    getTotalDesc,
    getTotalResult,
    judgmentHelper,
    persuasivenessRecomendation,
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
import { UnityOfStyleDataItem } from "../../models/graph/unity_of_style";

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
import RecommendConn from "../Analytics/-Block/-Recomendation/recHandler/RecommendConn";
import RecommendClarity from "../Analytics/-Block/-Recomendation/recHandler/RecommendClarity";
import RecommendDynamism from "../Analytics/-Block/-Recomendation/recHandler/RecommendDynamism";

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

// provider for setting the current time in graphs and others elements accoding to the video element
export const VideoTimeContext = createContext({
    currentTime: "00:00",
    setCurrentTime: (() => {}) as Dispatch<SetStateAction<string>>,
});

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

    useEffect(() => {
        if (videoInfoFromBack && videoInfoFromBack.data) {
            setVideoInfo(videoInfoFromBack.data!.data);
        }
    }, [videoInfoFromBack]);

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
            setConnectivityData(ConnectivityDataFromBack.data.data);
        }
    }, [ConnectivityDataFromBack]);

    useEffect(() => {
        if (InformativeDataFromBack && InformativeDataFromBack.data) {
            console.log(InformativeDataFromBack.data.data)
            setInformativeData(InformativeDataFromBack.data.data);
        }
    }, [InformativeDataFromBack]);

    useEffect(() => {
        if (
            UnityOfStyleDataFromBack &&
            UnityOfStyleDataFromBack.data &&
            UnityOfStyleDataFromBack.data.data!.values
        ) {
            setUnityOfStyleData(UnityOfStyleDataFromBack.data.data!.values);
        }
    }, [UnityOfStyleDataFromBack]);

    useEffect(() => {
        if (
            ArgumentativenessDataFromBack &&
            ArgumentativenessDataFromBack.data
        ) {
            setArgumentativenessData(ArgumentativenessDataFromBack.data.data);
        }
    }, [ArgumentativenessDataFromBack]);

    useEffect(() => {
        if (ClarityDataFromBack && ClarityDataFromBack.data) {
            setClarityData(ClarityDataFromBack.data.data);
        }
    }, [ClarityDataFromBack]);

    useEffect(() => {
        if (EloquenceDataFromBack && EloquenceDataFromBack.data) {
            setEloquenceData(EloquenceDataFromBack.data.data);
        }
    }, [EloquenceDataFromBack]);

    useEffect(() => {
        if (ExpressivenessDataFromBack && ExpressivenessDataFromBack.data) {
            setExpressivenessData(ExpressivenessDataFromBack.data.data);
        }
    }, [ExpressivenessDataFromBack]);

    useEffect(() => {
        if (NonMonotonyDataFromBack && NonMonotonyDataFromBack.data) {
            setNonMonotonyData(NonMonotonyDataFromBack.data.data);
        }
    }, [NonMonotonyDataFromBack]);

    useEffect(() => {
        if (EmotionalityDataFromBack && EmotionalityDataFromBack.data) {
            setEmotionalityData(EmotionalityDataFromBack.data.data);
        }
    }, [EmotionalityDataFromBack]);

    useEffect(() => {
        if (EnergyDataFromBack && EnergyDataFromBack.data) {
            setEnergyData(EnergyDataFromBack.data.data);
        }
    }, [EnergyDataFromBack]);

    useEffect(() => {
        if (CongruenceDataFromBack && CongruenceDataFromBack.data) {
            setCongruenceData(CongruenceDataFromBack.data.data);
        }
    }, [CongruenceDataFromBack]);

    useEffect(() => {
        if (ConfidenceDataFromBack && ConfidenceDataFromBack.data) {
            setConfidenceData(ConfidenceDataFromBack.data.data);
        }
    }, [ConfidenceDataFromBack]);

    useEffect(() => {
        if (EmotionalArousalDataFromBack && EmotionalArousalDataFromBack.data) {
            setEmotionalArousalData(EmotionalArousalDataFromBack.data.data);
        }
    }, [EmotionalArousalDataFromBack]);

    useEffect(() => {
        if (CommunicativeDataFromBack && CommunicativeDataFromBack.data) {
            setCommunicativeData(CommunicativeDataFromBack.data.data);
        }
    }, [CommunicativeDataFromBack]);

    useEffect(() => {
        if (TotalDataFromBack && TotalDataFromBack.data) {
            setTotalData(TotalDataFromBack.data.data);
        }
    }, [TotalDataFromBack]);

    // ----------------------RECOMENDATION----------------------
    const [connectivityRec, setConnectivityRec] = useState<string[]>([]);
    const [argumentativenessRec, setArgumentativenessRec] = useState<string[]>(
        []
    );
    const [clarityRec, setClarityRec] = useState<string[]>([]);
    const [dynamismRec, setDynamismRec] = useState<string[]>([]);
    const [persuasivenessRec, setPersuasivenessRec] = useState<string[]>([]);
    const [communicativeRec, setCommunicativeRec] = useState<string[]>([]);

    useEffect(() => {
        if (totalData) {
            const curArgumentativenessRec = argumentativenessRec;
            curArgumentativenessRec?.push(
                argumentativenessRecomendation(
                    totalData!.values.connectedness,
                    argumentativenessData?.originality!,
                    argumentativenessData?.citation!,
                    argumentativenessData?.borrowing!
                )
            );
            setArgumentativenessRec(curArgumentativenessRec);
        }
    }, [totalData]);

    const resultDesc = useMemo(() => {
        if (energyData && confidenceData && informativeData) {
            // console.log({
            //     connectivity: informativeData!.informative,
            //     argumentativeness: 0,
            //     clarity: 0,
            //     dynamism: energyData.total_energy,
            //     persuasiveness: confidenceData.average_value,
            //     communicative: 0,
            // });
            return {
                connectivity: informativeData!.informative,
                argumentativeness: 0,
                clarity: 0,
                dynamism: energyData.total_energy,
                persuasiveness: confidenceData.average_value,
                communicative: 0,
            };
        } else
            return {
                connectivity: 0,
                argumentativeness: 0,
                clarity: 0,
                dynamism: 0,
                persuasiveness: 0,
                communicative: 0,
            };
    }, [energyData, confidenceData, informativeData]);

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
                        <VideoPlayer
                            url={`/api/video/${idVideo}`}
                            controls={true}
                        />
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
                                value={{ currentTime, setCurrentTime }}
                            >
                                <SpeechTranscription idVideo={idVideo} />
                            </VideoTimeContext.Provider>
                        </div>
                    </ColorfulTabs>
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
                                    connectivityData.controversy
                                )}`}
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
                                subtitle={AddTextUnityOfStyle(
                                    unityOfStyleData.scientific,
                                    unityOfStyleData.official,
                                    unityOfStyleData.publicistic,
                                    unityOfStyleData.colloquial,
                                    unityOfStyleData.artistic
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

                        {unityOfStyleData &&
                            connectivityData &&
                            informativeData && (
                                <RecommendConn
                                    Nprotiv={connectivityData.controversy}
                                    Tparaz={informativeData.parasite}
                                    Tnerech={informativeData.sounds}
                                    Tpauza={informativeData.empty}
                                    Tob={100}
                                    Pnauch={unityOfStyleData.scientific}
                                    Pofic={unityOfStyleData.official}
                                    Ppabl={unityOfStyleData.publicistic}
                                    Prazgovor={unityOfStyleData.colloquial}
                                    Phud={unityOfStyleData.artistic}
                                />
                            )}
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
                        <div className={cnReport("conclusion-desciption-text")}>
                            {`Способность выступающего подтверждать свои
                            утверждения обоснованными фактами, доказательствами,
                            примерами и логическими операциями, умение логически
                            связывать свои мысли со свидетельствами и
                            доказательствами.`}
                        </div>
                        {argumentativenessData && (
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
                        <Recomendation
                            recomendation={
                                argumentativenessRec.length !== 0
                                    ? `${argumentativenessRec.join(" ")}`
                                    : // : // ПОСЛЕ ПИЛОТА ВЕРНУТЬ
                                      "Важно приводить не только аргументы “за” (за свой тезис), но и аргументы “против”. Они должны убеждать аудиторию в том, что аргументы, приводимые в поддержку критикуемого Вами тезиса, слабые и не выдерживают критики."
                                //   `С целью недопущения попадания информации, возможно носящей характер коммерческой тайны, в систему Антиплагиат на время проведения бета-тестирования параметры "оригинальность", "заимствования" и "цитирования" временно не определяются.`
                            }
                        />
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
                        {clarityData && (
                            <Dropdown
                                title={"Четкость речи"}
                                subtitle={clarityData.expressiveness}
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
                                subtitle={AddTextEloquence(
                                    eloquenceData.values.parasitic_words,
                                    Math.ceil(
                                        (eloquenceData.values.parasitic_words /
                                            10 +
                                            eloquenceData.values.short_words) *
                                            2.5 *
                                            25
                                    ),
                                    eloquenceData.values.parasitic_words,
                                    Math.ceil(
                                        ((eloquenceData.values.parasitic_words /
                                            10 +
                                            eloquenceData.values
                                                .short_sentences) *
                                            2,
                                        5)
                                    ),
                                    eloquenceData.values.short_words,
                                    eloquenceData.values.action_words
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

                        {expressivenessData && (
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

                        {clarityData && eloquenceData && expressivenessData && (
                            <RecommendClarity
                                Nitemp={
                                    (clarityData.sounds +
                                        clarityData.trembling) /
                                    (clarityData.basic +
                                        clarityData.sounds +
                                        clarityData.trembling)
                                }
                                Tnerech={clarityData.sounds}
                                Tdroz={clarityData.trembling}
                                Tob={
                                    clarityData.basic +
                                    clarityData.sounds +
                                    clarityData.trembling
                                }
                                Nzpredl={eloquenceData.values.short_words}
                                Nparaz={eloquenceData.values.parasitic_words}
                                Nkpedl={eloquenceData.values.short_sentences}
                                Napredl={eloquenceData.values.action_words}
                                Npredl={Math.ceil(
                                    ((eloquenceData.values.parasitic_words /
                                        10 +
                                        eloquenceData.values.short_sentences) *
                                        2,
                                    5)
                                )}
                                Nvist={
                                    Math.ceil(
                                        ((eloquenceData.values.parasitic_words /
                                            10 +
                                            eloquenceData.values
                                                .short_sentences) *
                                            2,
                                        5)
                                    ) * 25
                                }
                                Pekspr={expressivenessData.total_expressiveness}
                            />
                        )}

                        {/*                       <Recomendation
                            recomendation={
                                clarityRec.length !== 0
                                    ? "слепить"
                                    : "Регулярно расширяйте свой словарный запас, поскольку это поможет Вам в выборе более точных и выразительных слов для передачи своих мыслей и эмоций."
                            }
                        /> */}
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
                                                subtitle:
                                                    "Темп речи средний, ровный и без пауз.",
                                                result: "норма",
                                                fill: "#2477F4",
                                                dotfill: "#2477F4",
                                                shadow: "0.663492px 0.663492px 3.4619px #2477F4",
                                                img: "",
                                                value: nonMonotonyData[
                                                    "h-temp"
                                                ],
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
                                                value: nonMonotonyData[
                                                    "h-volume"
                                                ],
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
                                                value: nonMonotonyData[
                                                    "h-tone"
                                                ],
                                            },
                                        ]}
                                    />
                                }
                                invisible={
                                    // сюда надо добавить data
                                    <SecondaryNonMonotony
                                        data={nonMonotonyData.values}
                                        averages={[
                                            nonMonotonyData["h-temp"],
                                            nonMonotonyData["h-volume"],
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
                                                link: "Тон речи",
                                            },
                                        ]}
                                    />
                                }
                            />
                        )}
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
                                subtitle={textForEnergySmile(
                                    energyData.total_energy
                                )}
                                visible={
                                    <EnergySmile
                                        energy={energyData.total_energy}
                                    />
                                }
                                invisible={
                                    <SecondaryEnergy
                                        data={energyData.values}
                                        average={energyData.total_energy}
                                    />
                                }
                            />
                        )}

                        {emotionalityData && nonMonotonyData && energyData && (
                            <RecommendDynamism
                                htemp={nonMonotonyData["h-temp"]}
                                hgromk={nonMonotonyData["h-volume"]}
                                hton={nonMonotonyData["h-tone"]}
                                pemotion={
                                    (emotionalityData.total.anger +
                                        emotionalityData.total.neutral +
                                        emotionalityData.total.happiness) /
                                    3
                                }
                                penergi={energyData.total_energy}
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
                                subtitle={judgmentHelper(
                                    confidenceData.uncertainty
                                )}
                                visible={
                                    <MainConfidence
                                        data={confidenceData.values}
                                        endTime={+videoInfo!.duration}
                                    />
                                }
                                invisible={
                                    <SecondaryConfidence
                                        data={confidenceData.values}
                                        average={
                                            100 -
                                            confidenceData.average_value * 100
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
                                                    "Отношение количества глаголов к количеству существительных в единице текста должно быть близко к 1.",
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
                                                    "Отношение количества глаголов и глагольных форм к общему количеству всех слов не должно превышать 0,6.",
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
                        <Recomendation
                            recomendation={
                                persuasivenessRec &&
                                persuasivenessRec.length === 0
                                    ? persuasivenessRecomendation(
                                          congruenceData?.diameter.audio.anger,
                                          congruenceData?.diameter.audio
                                              .happiness,
                                          congruenceData?.diameter.audio
                                              .neutral,
                                          congruenceData?.diameter.text.anger,
                                          congruenceData?.diameter.text
                                              .happiness,
                                          congruenceData?.diameter.text.neutral,
                                          congruenceData?.diameter.video.anger,
                                          congruenceData?.diameter.video
                                              .happiness,
                                          congruenceData?.diameter.video
                                              .neutral,
                                          confidenceData?.average_value,
                                          confidenceData?.uncertainty,
                                          emotionalArousalData?.values
                                              .trager_coefficient,
                                          emotionalArousalData?.values
                                              .action_certainty_factor,
                                          emotionalArousalData?.values
                                              .aggressiveness_coefficient
                                      )
                                    : "В случае, если Вы ставите себе целью убедить людей в чем-либо, либо Вам надо побудить людей в аудитории к определенным действиям, то Вам лучше всего сконцентрироваться на подробном анализе аудитории (чтобы понять, какие именно факторы повлияют на позицию аудитории), на содержании и структуре презентации с продумыванием аргументов и примеров (чтобы речь была логичной и убедительной) и на тщательной подготовке наглядных пособий (это усилит Ваше влияние на людей)."
                            }
                        />
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
                                    <SecondaryDefeat
                                        breakdown={communicativeData.values}
                                        state={""}
                                    />
                                }
                            />
                        )}
                        <Recomendation
                            recomendation={
                                communicativeRec.length === 0
                                    ? communicativeRecomendation(
                                          communicativeData?.filler_words,
                                          communicativeData?.cognitive_distortion,
                                          communicativeData?.aggression
                                      )
                                    : "Помните, нарушение коммуникативных норм обычно не остается незамеченным. В зависимости от того, насколько грубым было это нарушение, наказания выражаются в отказе адресата от коммуникации вообще, в прерывании общения, в недостижении цели общения."
                            }
                        />
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
        </div>
    );
}
