import { Link, Outlet } from "react-router-dom";
import EmptyLayout from "../../../layouts/EmptyLayout";
import { cn } from "@bem-react/classname";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

export default function RecodingPage() {
    const cnRecoding = cn("RecodingPage");

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleDataAvailable = useCallback(
        ({ data }:any) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = useCallback(() => {

        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    return (
        <EmptyLayout>
            RecodingPage
            <div className={cnRecoding()}>
            <div className={cnRecoding("Container")}>
                <Webcam
                    height={400}
                    width={400}
                    audio={true}
                    mirrored={true}
                    ref={webcamRef}
                    muted = {true}
                    videoConstraints={videoConstraints}
                />
                {capturing ? (
                    <button className={cnRecoding("button")} onClick={handleStopCaptureClick}>
                        Stop Capture
                    </button>
                ) : (
                    <button className={cnRecoding("button")} onClick={handleStartCaptureClick}>
                        Start Capture
                    </button>
                )}
                {recordedChunks.length > 0 && (
                    <button className={cnRecoding("button")} onClick={handleDownload}>Download</button>
                )}
            </div>
            </div>
            <Outlet />
        </EmptyLayout>
    );
}
