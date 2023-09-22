import EmptyLayout from "../../layouts/EmptyLayout";
import { cn } from "@bem-react/classname";
import Webcam from "react-webcam";
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Timer from "../../components/Timer";
import BasicTextPlan from "../../components/BasicTextPlan";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import {
    IInfoVideo,
    VideoUploadContext,
    initialInfoVideo,
} from "../../components/RepetitionComponents/RepetitionStart";
import PreviewBlock from "../../components/PreviewBlock";
import { useSendVideoMutation } from "../../store/api/userVideo";
import RoutesEnum from "../../models/routes";

import backIcon from "./assets/Vector.svg";
import startRecordIcon from "./assets/video-play.svg";
// import dangerIcon from "./assets/danger.svg";

import { ReactSVG } from "react-svg";

import "./style.scss";
import { MAX_MINUTES_FOR_VIDEO } from "../../constants";
import Stopwatch from "../../components/Stopwatch";

export const TIMER_STATUS = {
    START: true,
    STOP: false,
};

export default function RecodingPage() {
    /* ----------------------------------- CONST BLOCK ----------------------------------- */
    const cnRecoding = cn("RecodingPage");
    const loadingPicture = "/images/loading.svg"; //path to public

    const navigate = useNavigate();
    const { state } = useLocation();

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    /* ----------------------------------- PLAN  ----------------------------------- */
    const { basicPlan, timerSeconds } = state;

    const isShowBasicPlan =
        basicPlan && basicPlan.length > 0 && basicPlan[0] !== "" ? true : false;

    /* ----------------------------------- TIMER  ----------------------------------- */
    const secondsForTimer = timerSeconds
        ? timerSeconds
        : MAX_MINUTES_FOR_VIDEO * 60;

    const timerHidden = timerSeconds && timerSeconds > 0 ? false : true;

    const [isTimerStart, setIsTimerStart] = useState(false);

    const updateIsTimerStart = (value: boolean) => {
        setIsTimerStart(value);
    };

    const [, setResultDuration] = useState(0);

    /* ----------------------------------- MODAL PARAMS BLOCK ----------------------------------- */
    const [isModal, setModal] = useState(false);
    const [currentFile, setCurrentFile] = useState<File>(new File([], "empty"));

    const closeModal = () => {
        setCurrentFile(new File([], "empty"));
        setModal(false);
    };

    const [isWarning, setIsWarning] = useState(false);

    const closeWarningModal = () => {
        setIsWarning(false);
    };

    /* ----------------------------------- WEBCAM PARAMS BLOCK ----------------------------------- */

    const [canStart, setCanStart] = useState(true);

    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleDataAvailable = useCallback(
        ({ data }: any) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        if (canStart) {
            setResultSeconds(0);
            updateIsTimerStart(TIMER_STATUS.START);
            setCapturing(true);
            mediaRecorderRef.current = new MediaRecorder(
                webcamRef?.current?.stream as MediaStream,
                {
                    mimeType: `video/webm`,
                }
            );
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        updateIsTimerStart(TIMER_STATUS.STOP);
        if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    useEffect(() => {
        if (recordedChunks.length > 0) {
            const tempType = `video/webm`;
            const file = new Blob(recordedChunks, {
                type: tempType,
            });
            setCurrentFile(
                new File([file], "Recoding Repetition", {
                    type: tempType,
                })
            );
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    useLayoutEffect(() => {
        if (currentFile.size !== 0) {
            setModal(true);
        } else {
            setModal(false);
        }
    }, [currentFile]);

    /* ----------------------------------- DEVICES BLOCK ----------------------------------- */
    const [devices, setDevices] = useState([]);

    const handleDevices = useCallback(
        (mediaDevices: any) =>
            setDevices(
                mediaDevices.filter(({ kind }: any) => kind === "videoinput")
            ),
        [setDevices]
    );

    useEffect(() => {
        if (devices) {
            if (devices.length >= 1) setCanStart(true);
            else setCanStart(false);
        }
    }, [devices]);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    /* ----------------------------------- LOADING MODAL PARAMS BLOCK ----------------------------------- */
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [currentInfoData, setCurrentInfoData] =
        useState<IInfoVideo>(initialInfoVideo);
    const [isErrorWithSuccess, setIsErrorWithSuccess] = useState(false);

    useEffect(() => {
        if (currentInfoData && currentInfoData.title.length > 0) {
            sendVideoData();
            closeModal();
            showLoadingModal();
        }
    }, [currentInfoData]);

    const [videoSendRequest, videoSendResponse] = useSendVideoMutation();
    const { isLoading, isSuccess, isError } = videoSendResponse;

    const sendVideoData = async () => {
        if (currentInfoData) {
            await videoSendRequest(currentInfoData);
        }
    };

    const showLoadingModal = async () => {
        setIsLoadingModal(true);
    };

    const closeLoadingModal = () => {
        setIsLoadingModal(false);
    };

    // answers from back
    useEffect(() => {
        if (isSuccess) {
            console.log("isSuccess", videoSendResponse);
            const data = videoSendResponse.data;
            if (data.success) {
                setCurrentFile(new File([], "empty"));
                setCurrentInfoData(initialInfoVideo);
            } else {
                setIsErrorWithSuccess(true);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            console.log("isError", videoSendResponse.error);
            setCurrentFile(new File([], "empty"));
            setCurrentInfoData(initialInfoVideo);
        }
    }, [isError]);

    const setResultSeconds = (seconds: number) => {
        setResultDuration(seconds);
        setCurrentInfoData((prev) => {
            return { ...prev, duration: `${seconds}` };
        });
    };

    return (
        <EmptyLayout>
            <div className={cnRecoding()}>
                <div className={cnRecoding("container")}>
                    <div className={cnRecoding("video-block")}>
                        <Webcam
                            className={cnRecoding("video")}
                            audio={true}
                            mirrored={true}
                            ref={webcamRef}
                            muted={true}
                            videoConstraints={videoConstraints}
                            onUserMediaError={(e) => {
                                setCanStart(false);
                                setIsWarning(true);
                                console.log("onUserMediaError", e);
                            }}
                            onUserMedia={(e) => console.log("onUserMedia", e)}
                        />

                        <div className={cnRecoding("button-block")}>
                            {capturing ? (
                                <button
                                    className={cnRecoding("button")}
                                    onClick={handleStopCaptureClick}
                                >
                                    Завершить
                                </button>
                            ) : (
                                <>
                                    <button
                                        className={cnRecoding("button", {
                                            disable: !canStart,
                                        })}
                                        onClick={handleStartCaptureClick}
                                    >
                                        <ReactSVG
                                            src={startRecordIcon}
                                            className={cnRecoding("icon")}
                                        />
                                        Начать репетицию
                                    </button>
                                    <div
                                        className={cnRecoding(
                                            "button-block-back",
                                            "button-block-back"
                                        )}
                                        onClick={() => navigate(-1)}
                                    >
                                        <ReactSVG
                                            src={backIcon}
                                            className={cnRecoding("icon")}
                                        />
                                        Вернуться к настройкам
                                    </div>
                                </>
                            )}
                        </div>

                        <div className={cnRecoding("right-block")}>
                            {timerHidden ? (
                                <Stopwatch
                                    seconds={secondsForTimer}
                                    isStart={isTimerStart}
                                    setResultSeconds={setResultSeconds}
                                    timerOver={handleStopCaptureClick}
                                />
                            ) : (
                                <Timer
                                    seconds={secondsForTimer}
                                    isStart={isTimerStart}
                                    setResultSeconds={setResultSeconds}
                                    timerOver={handleStopCaptureClick}
                                />
                            )}
                        </div>

                        {isShowBasicPlan && (
                            <div className={cnRecoding("bottom-block")}>
                                <BasicTextPlan textPlan={basicPlan} />
                            </div>
                        )}
                    </div>

                    <ModalWindow
                        isVisible={isModal}
                        onClose={closeModal}
                        title={"Предпросмотр завершенной репетиции"}
                    >
                        <VideoUploadContext.Provider
                            value={{
                                currentFile,
                                setCurrentFile,
                                currentInfoData,
                                setCurrentInfoData,
                            }}
                        >
                            {currentFile.size !== 0 && (
                                <PreviewBlock
                                    titleRerecordBtn={"Перезаписать репетицию"}
                                    titleContinueBtn={"Отправить на анализ"}
                                    titleHelpForInput={
                                        "Задайте название репетиции"
                                    }
                                    onClickRerecordBtn={closeModal}
                                />
                            )}
                        </VideoUploadContext.Provider>
                    </ModalWindow>

                    <ModalWindow
                        isVisible={isLoadingModal}
                        onClose={closeLoadingModal}
                        closeOnClickOutside={!isLoading}
                    >
                        {(isLoading || isErrorWithSuccess || isError) && (
                            <div className={cnRecoding("loading")}>
                                <ReactSVG
                                    src={
                                        process.env.PUBLIC_URL + loadingPicture
                                    }
                                    className={cnRecoding("loading-img")}
                                />
                                {isLoading &&
                                    !(isErrorWithSuccess || isError) && (
                                        <>
                                            <div
                                                className={cnRecoding(
                                                    "loading-title"
                                                )}
                                            >
                                                Идет загрузка видео...
                                            </div>
                                            <div
                                                className={cnRecoding(
                                                    "loading-description"
                                                )}
                                            >
                                                Пожалуйста, не закрывайте
                                                вкладку до окончания загрузки.
                                            </div>
                                        </>
                                    )}
                                {(isErrorWithSuccess || isError) && (
                                    <>
                                        <div
                                            className={cnRecoding(
                                                "loading-title-error",
                                                "loading-title-error"
                                            )}
                                        >
                                            Произошла ошибка, попробуйте еще раз
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        {isSuccess && !isErrorWithSuccess && (
                            <div className={cnRecoding("loading")}>
                                <ReactSVG
                                    src={
                                        process.env.PUBLIC_URL + loadingPicture
                                    }
                                    className={cnRecoding("loading-img")}
                                />
                                <>
                                    <div
                                        className={cnRecoding("loading-title")}
                                    >
                                        Загрузка видео успешно завершена и
                                        отправлена на анализ
                                    </div>
                                    <div
                                        className={cnRecoding(
                                            "loading-description",
                                            "loading-description"
                                        )}
                                    >
                                        По его окончании вы сможете ознакомиться
                                        с результатами в разделе{" "}
                                        <span
                                            className={cnRecoding(
                                                "loading-title-link",
                                                "loading-title-link"
                                            )}
                                            onClick={() =>
                                                navigate(RoutesEnum.DIARY)
                                            }
                                        >
                                            Дневник
                                        </span>
                                    </div>
                                </>
                            </div>
                        )}
                    </ModalWindow>

                    <ModalWindow
                        isVisible={isWarning}
                        onClose={closeWarningModal}
                        title={"Предупреждение"}
                    >
                        <div className={cnRecoding("warning-message")}>
                            Камера не найдена, включите камеру и повторите
                            попытку или{" "}
                            <Link to={RoutesEnum.REPETITION}>загрузите</Link>{" "}
                            уже готовую репетицию.
                        </div>
                    </ModalWindow>
                </div>
            </div>
        </EmptyLayout>
    );
}
