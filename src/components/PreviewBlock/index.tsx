import { cn } from "@bem-react/classname";
import "./style.scss";
import rerecordIcon from "./rerecoding.svg";

import { ReactNode, useContext, useEffect, useRef, useState } from "react";

import { ForwardedInput } from "../ui-kit/Input";
import Button from "../ui-kit/Button";
import { VideoUploadContext } from "../RepetitionComponents/RepetitionStart";
import {
    useGetVideoByIdQuery,
    useSendVideoMutation,
} from "../../store/api/userVideo";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../models/routes";
import ReactPlayer from "react-player";

type IPreviewBlock = {
    titleRerecordBtn?: string;
    titleContinueBtn?: string;
    titleHelpForInput?: string;
    onClickRerecordBtn: Function;
};

export default function PreviewBlock({
    titleRerecordBtn = "Загрузить другой файл",
    titleContinueBtn = "Начать анализ репетиции",
    titleHelpForInput = "Задайте название",
    onClickRerecordBtn,
}: IPreviewBlock) {
    const cnPreview = cn("cnPreview");
    const navigate = useNavigate();


    // for input 
    const [isFileNameValid, setFilenamevalid] = useState(true);
    const [fileName, setFileName] = useState("");

    // get videofile from content
    const { currentFile, setCurrentFile } = useContext(VideoUploadContext);

    //  for sending video to server
    const [videoSendRequest, videoSendResponse] = useSendVideoMutation();
    const { isLoading, isSuccess, isError } = videoSendResponse;


    
    let video = document.querySelector("video");
    const mediaSource = new MediaSource();
    const mimeCodec = "video/mp4";

    useEffect(() => {
        console.log(video, "useEffect");
        if (video) {
            if ("srcObject" in video) {
                try {
                    video.srcObject = mediaSource;
                } catch (err: any) {
                    if (err.name !== "TypeError") {
                        throw err;
                    }
                    // Even if they do, they may only support MediaStream
                    video.src = URL.createObjectURL(mediaSource);
                }
            } 
        }
    }, [video]);

    mediaSource.addEventListener("sourceopen", () => {
        // Await sourceopen on MediaSource before creating SourceBuffers
        // and populating them with fetched media — MediaSource won't
        // accept creation of SourceBuffers until it is attached to the
        // HTMLMediaElement and its readyState is "open"
        const getSourceBuffers = async () => {
            const vidBuff = await currentFile.arrayBuffer();
            const sourceBuffer: SourceBuffer = await new Promise(
                (resolve, reject) => {
                    const getSourceBuffer = () => {
                        try {
                            const sourceBuffer =
                                mediaSource.addSourceBuffer(mimeCodec);
                            
                            resolve(sourceBuffer);
                        } catch (e) {
                            reject(e);
                        }
                    };
                    getSourceBuffer();
                }
            );
            sourceBuffer.appendBuffer(vidBuff);
            sourceBuffer.onupdateend = () => {
                // Nothing else to load
                mediaSource.endOfStream();
            };
        
        };
        getSourceBuffers();
    });

    const clickUpload = async () => {
        await videoSendRequest({
            title: fileName,
            duration: "string",
            description: "string",
            file: currentFile,
        });
        navigate(RoutesEnum.DIARY);
    };

    // answers from back
    useEffect(() => {
        if (isSuccess) {
            const data = videoSendResponse.data;
            if (data.success) {
                console.log(data);
                setCurrentFile(new File([], "empty"));
            } else {
                alert(data.error?.msg);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            const error = videoSendResponse.error as Response;
            alert(`Error with status code ${error.status}`);
            console.log(videoSendResponse.error);
        }
    }, [isError]);

    return (
        <div className={cnPreview()}>
            <div className={cnPreview("row")}>
                <div className={cnPreview("col")}>
                    <div className={cnPreview("video-block")}>
                        <ReactPlayer url={URL.createObjectURL(currentFile)}/>
                        <video width="500" height="300" controls>
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    </div>
                </div>

                <div className={cnPreview("col")}>
                    <div className={cnPreview("title")}>
                        <span className={cnPreview("title-videoname")}>
                            {currentFile.name}
                        </span>
                        <span className={cnPreview("title-characters")}>
                            1,2 Гб • 14 минут
                        </span>
                    </div>
                    <div className={cnPreview("input-block")}>
                        <label>
                            <div className={cnPreview("input-block-title")}>
                                <span
                                    className={cnPreview(
                                        "input-block-title-gray-bold"
                                    )}
                                >
                                    {titleHelpForInput}:{" "}
                                </span>
                                <span
                                    className={cnPreview(
                                        "input-block-title-gray"
                                    )}
                                >
                                    Не более 80 символов
                                </span>
                            </div>
                            <ForwardedInput
                                className={cnPreview("input")}
                                required
                                placeholder="Название файла"
                                maxLength={80}
                                value={fileName}
                                invalid={!isFileNameValid}
                                onChange={(e) => setFileName(e.target.value)}
                                onBlur={(e) =>
                                    setFilenamevalid(e.target.checkValidity())
                                }
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className={cnPreview("row")}>
                <div className={cnPreview("col")}>
                    <div className={cnPreview("btn")}>
                        <div className={cnPreview("btn")}>
                            <Button
                                className={cnPreview("btn-gray")}
                                onClick={() => onClickRerecordBtn()}
                            >
                                <ReactSVG src={rerecordIcon} />
                                {titleRerecordBtn}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cnPreview("col")}>
                    <div className={cnPreview("btn")}>
                        <Button
                            className={cnPreview("btn-blue")}
                            onClick={clickUpload}
                        >
                            {titleContinueBtn}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
