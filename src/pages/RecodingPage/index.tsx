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

import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";

import sss from "./assets/Vector.svg";
import vvvv from "./assets/video-play.svg";
import { ReactSVG } from "react-svg";

import Timer from "../../components/Timer";
import BasicTextPlan from "../../components/BasicTextPlan";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { VideoUploadContext } from "../../components/RepetitionComponents/RepetitionStart";
import PreviewBlock from "../../components/PreviewBlock";

export const TIMER_STATUS = {
    START: true,
    STOP: false,
};

const LIMIT_TIMER = 15;

export default function RecodingPage() {
    const navigate = useNavigate();
    const cnRecoding = cn("RecodingPage");

    const { state } = useLocation();
    const { basicPlan, isTimer } = state;

    // timer params
    const isShowBasicPlan =
        basicPlan && basicPlan.length > 0 && basicPlan[0] !== "" ? true : false;
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

    // webcam params

    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleDataAvailable = useCallback(
        ({ data }: any) => {
            console.log("handleDataAvailable", data);
            if (data.size > 0) {
                console.log("size", data.size);
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
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
            setCurrentFile(new File([file], "Recoding Repetition"));
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
                                        className={cnRecoding("button")}
                                        onClick={handleStartCaptureClick}
                                    >
                                        <ReactSVG
                                            src={vvvv}
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
                                            src={sss}
                                            className={cnRecoding("icon")}
                                        />
                                        Вернуться к настройкам
                                    </div>
                                </>
                            )}
                        </div>
                        <div
                            className={cnRecoding("right-block", {
                                "hidden": !isTimer,
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
                            value={{ currentFile, setCurrentFile }}
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
                </div>
            </div>
        </EmptyLayout>
    );
}
