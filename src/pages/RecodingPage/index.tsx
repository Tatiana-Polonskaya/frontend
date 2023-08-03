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
import dangerIcon from "./assets/danger.svg";

import { ReactSVG } from "react-svg";

import "./style.scss";

export const TIMER_STATUS = {
    START: true,
    STOP: false,
};

const LIMIT_TIMER = 15;

export default function RecodingPage() {
    /* ----------------------------------- CONST BLOCK ----------------------------------- */
    const cnRecoding = cn("RecodingPage");
    const loadingPicture = "/images/loading.svg"; //path to public

    const navigate = useNavigate();
    const { state } = useLocation();
    const { basicPlan, timerSeconds } = state;

    console.log("timerSeconds", timerSeconds)

    // basicPlan params
    const isShowBasicPlan =
        basicPlan && basicPlan.length > 0 && basicPlan[0] !== "" ? true : false;

    const secondsForTimer = timerSeconds ? timerSeconds : 0;

    // timer params
    const [isTimerStart, setIsTimerStart] = useState(false);

    const updateIsTimerStart = (value: boolean) => {
        setIsTimerStart(value);
    };

    /* ----------------------------------- MODAL PARAMS BLOCK ----------------------------------- */
    const [isModal, setModal] = useState(false);
    const [currentFile, setCurrentFile] = useState<File>(new File([], "empty"));

    const closeModal = () => {
        setCurrentFile(new File([], "empty"));
        setModal(false);
    };

    const [isWarning, setIsWarning] = useState(false); // поменять когда будет доступ к камере на false и использовать при колбэке от камеры

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
            // const tempCodec = "h264";
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
            // console.log(mediaRecorderRef.current);
        }
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        updateIsTimerStart(TIMER_STATUS.STOP);
        if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    // CHECK :  "vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h264", "opus", "pcm"
    // DONE :
    useEffect(() => {
        if (recordedChunks.length > 0) {
            // const tempCodec = "h264";
            const tempType = `video/webm`; //"video/webm" was
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

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

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

    function getSupportedMimeTypes(
        media: string,
        types: string[],
        codecs: string[]
    ) {
        const isSupported = MediaRecorder.isTypeSupported;
        const supported: any = [];
        types.forEach((type) => {
            const mimeType = `${media}/${type}`;
            codecs.forEach((codec) =>
                [
                    `${mimeType};codecs=${codec}`,
                    `${mimeType};codecs=${codec.toUpperCase()}`,
                    // /!\ false positive /!\
                    // `${mimeType};codecs:${codec}`,
                    // `${mimeType};codecs:${codec.toUpperCase()}`
                ].forEach((variation) => {
                    if (isSupported(variation)) supported.push(variation);
                })
            );
            if (isSupported(mimeType)) supported.push(mimeType);
        });
        return supported;
    }

    // Usage ------------------

    const videoTypes = ["webm", "ogg", "mp4", "x-matroska"];
    const audioTypes = ["webm", "ogg", "mp3", "x-matroska"];
    const codecs = [
        "should-not-be-supported",
        "vp9",
        "vp9.0",
        "vp8",
        "vp8.0",
        "avc1",
        "av1",
        "h265",
        "h.265",
        "h264",
        "h.264",
        "opus",
        "pcm",
        "aac",
        "mpeg",
        "mp4a",
    ];

    // const supportedVideos = getSupportedMimeTypes("video", videoTypes, codecs);
    // const supportedAudios = getSupportedMimeTypes("audio", audioTypes, codecs);

    // console.log("-- All supported Videos : ", supportedVideos);
    // console.log("-- All supported Audios : ", supportedAudios);

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
            const error = videoSendResponse.error as Response;
            console.log("isError", videoSendResponse.error);
            setCurrentFile(new File([], "empty"));
            setCurrentInfoData(initialInfoVideo);
        }
    }, [isError]);

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
                        {secondsForTimer>0 && (
                            <div
                            className={cnRecoding("right-block")}
                        >
                            <Timer
                                minutes={Math.floor(secondsForTimer/60)}
                                seconds={secondsForTimer%60}
                                isStart={isTimerStart}
                                setIsStart={updateIsTimerStart}
                                timerOver={handleStopCaptureClick}
                            />
                        </div>
                        )}
                        

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
                                {isLoading && !(isErrorWithSuccess || isError) && (
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
                                            Пожалуйста, не закрывайте вкладку до
                                            окончания загрузки.
                                        </div>
                                    </>
                                )}
                                {(isErrorWithSuccess || isError)  && (
                                    <>
                                        <div
                                            className={cnRecoding(
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
                                            "loading-description"
                                        )}
                                    >
                                        По его окончании вы сможете ознакомиться
                                        с результатами в разделе{" "}
                                        <span
                                            className={cnRecoding(
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
