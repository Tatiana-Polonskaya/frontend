import EmptyLayout from "../../layouts/EmptyLayout";
import { cn } from "@bem-react/classname";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

import "./style.scss";
import { useNavigate } from "react-router-dom";

import sss from "./assets/Vector.svg";
import vvvv from "./assets/video-play.svg";
import { ReactSVG } from "react-svg";

export default function RecodingPage() {
    const navigate = useNavigate();
    const cnRecoding = cn("RecodingPage");

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
        if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/mp4",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = "react-webcam-stream-capture.mp4";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    return (
        <EmptyLayout>
            <div className={cnRecoding()}>
                <div className={cnRecoding("Container")}>
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
                    </div>

                    {recordedChunks.length > 0 && (
                        <button
                            className={cnRecoding("button")}
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    )}
                </div>
            </div>
        </EmptyLayout>
    );
}
