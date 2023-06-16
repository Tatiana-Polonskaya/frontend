import { cn } from "@bem-react/classname";
import "./style.scss";

import {
    ChangeEvent,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { PreventAny } from "@reduxjs/toolkit/dist/entities/models";
import PreviewBlock from "../PreviewBlock";
import { VideoUploadContext } from "../RepetitionComponents/RepetitionStart";

export const PreviewVideoContext = createContext({videoName: "", url: ""});

export default function Upload() {
    const handleFile = (file: any) => {
        setVideoFile(file);
        // setNewVideo(file.name);
        console.log("videoFile ok", videoFile, file);
    };

    const cnUpload = cn("cnUpload");
    const [dragActive, setDragActive] = useState(false);
    const [videoFile, setVideoFile] = useState<any>();

    // handle drag events
    const handleDrag = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e: any) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
            setCurrentFile(e.target.files[0])
        }
    };


    const {currentFile, setCurrentFile} = useContext(VideoUploadContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={cnUpload()}>
            <div className={cnUpload("description")}>
                <span className={cnUpload("description-gray")}>
                    Если у вас имеется готовое видео, которое вы хотите
                    проанализировать - просто загрузите его с устройства.
                </span>
                <span className={cnUpload("description-blue")}>
                    Максимальная длительность видео - 15 минут. Формат видео:
                    MP4, MOV или AVI, минимальное разрешение 640х480.
                </span>
            </div>
            <div className={cnUpload("dropdown")}>
                <form
                    className={cnUpload("dropdown-form-file-upload")}
                    onDragEnter={handleDrag}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className={cnUpload("dropdown-input-file-upload")}
                        accept="video/mp4"
                        onChange={handleChange}
                    />
                    <label
                        className={cnUpload("dropdown-label-file-upload", {
                            "drag-active": dragActive,
                        })}
                        id="label-file-upload"
                        htmlFor="input-file-upload"
                    >
                        <div>
                            <p className={cnUpload("dropdown-text-upload")}>
                                Перетащите видео сюда или{" "}
                                <span
                                    className={cnUpload(
                                        "dropdown-upload-button"
                                    )}
                                    onClick={onButtonClick}
                                >
                                    загрузите файл
                                </span>
                            </p>
                        </div>
                    </label>
                    {dragActive && (
                        <div
                            className={cnUpload("dropdown-drag-file-element")}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        ></div>
                    )}
                </form>
            </div>
            {/* {videoFile &&
            <PreviewVideoContext.Provider value={{videoName: videoFile.name ,url:URL.createObjectURL(videoFile as File)}}>
                <PreviewBlock />
            </PreviewVideoContext.Provider> */}

            {/* {videoFile && (
                <video width="600" height="300" controls>
                    <source src={URL.createObjectURL(videoFile as File)} />
                </video>
            )} */}
        </div>
    );
}
