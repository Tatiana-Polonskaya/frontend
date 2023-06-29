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
    const navigate = useNavigate();
    const cnRecoding = cn("RecodingPage");
    const loadingPicture = "/images/loading.svg"; //path to public

    const { state } = useLocation();
    const { basicPlan, isTimer } = state;

    // basicPlan params
    const isShowBasicPlan =
        basicPlan && basicPlan.length > 0 && basicPlan[0] !== "" ? true : false;

    // timer params
    const [isTimerStart, setIsTimerStart] = useState(false);

    const updateIsTimerStart = (value: boolean) => {
        setIsTimerStart(value);
    };

    // modal params
    const [isModal, setModal] = useState(false);
    const [currentFile, setCurrentFile] = useState<File>(new File([], "empty"));

    const closeModal = () => {
        setCurrentFile(new File([], "empty"));
        setModal(false);
    };

    const [isWarning, setIsWarning] = useState(true); // поменять когда будет доступ к камере на false и использовать при колбэке от камеры
    const closeWarningModal = () => {
        setIsWarning(false);
    };

    // webcam params

    const [canStart, setCanStart] = useState(false);

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
        if(canStart){
        updateIsTimerStart(TIMER_STATUS.START);
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(
            webcamRef?.current?.stream as MediaStream,
            {
                mimeType: "video/webm",
            }
        );
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
        console.log(mediaRecorderRef.current)}
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        updateIsTimerStart(TIMER_STATUS.STOP);
        if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    useEffect(() => {
        if (recordedChunks.length > 0) {
            const file = new Blob(recordedChunks, {
                type: "video/webm",
            });
            setCurrentFile(new File([file], "Recoding Repetition",{
                type: "video/webm",
            }));
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


    // loading modal
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
            console.log(videoSendResponse.error);
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
                            onUserMediaError={e=> console.log("onUserMediaError", e)}
                            onUserMedia={e=>console.log("onUserMedia", e)}
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
                                        className={cnRecoding("button", {disable: !canStart})}
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
                        <div
                            className={cnRecoding("right-block", {
                                hidden: !isTimer,
                            })}
                        >
                            <Timer
                                minutes={LIMIT_TIMER}
                                seconds={0}
                                isStart={isTimerStart}
                                setIsStart={updateIsTimerStart}
                                timerOver={handleStopCaptureClick}
                            />
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
                        {(isLoading || (isErrorWithSuccess || isError)) && (
                                <div className={cnRecoding("loading")}>
                                    <ReactSVG
                                        src={
                                            process.env.PUBLIC_URL +
                                            loadingPicture
                                        }
                                        className={cnRecoding("loading-img")}
                                    />
                                    {isLoading && (
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
                                                    "loading-title-error"
                                                )}
                                            >
                                                Произошла ошибка, попробуйте еще
                                                раз
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        {isSuccess && (
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
                                        Загрузка видео успешно закончена и
                                        отправлена на анализ
                                    </div>
                                    <div
                                        className={cnRecoding(
                                            "loading-description"
                                        )}
                                    >
                                        Анализ вы можете посмотреть на странице{" "}
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
                            Невозможно подключиться к камере, попробуйте позже или <Link to={RoutesEnum.REPETITION}>загрузите</Link> уже готовую репетицию.
                        </div>
                    </ModalWindow>
                </div>
            </div>
        </EmptyLayout>
    );
}
