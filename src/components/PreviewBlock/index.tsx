import { cn } from "@bem-react/classname";
import "./style.scss";
import rerecordIcon from "./icon/rerecoding.svg";
import videoRemoveIcon from "./icon/video-remove.svg";

import {
    LegacyRef,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

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
type propFuncSize = {
    titleSize: string;
    titleNameSize: string;
};

const NORM_COUNT_MINUTES = 15;

function getPrettyDuration(seconds: number): number {
    return Math.ceil(seconds / 60);
}

// get number of bytes, return Кб or МБ or ГБ
function getPrettySizeFile(size: number, decimals = 2): string {
    if (size === 0) {
        return "0";
    } else {
        const info_for_step = 1024;
        var dm = decimals < 0 ? 0 : decimals;
        var sizes = ["байт", "КБ", "МБ", "ГБ", "ТБ"];
        var i = Math.floor(Math.log(size) / Math.log(info_for_step));
        return (
            parseFloat((size / Math.pow(info_for_step, i)).toFixed(dm)) +
            " " +
            sizes[i]
        );
    }
}

export default function PreviewBlock({
    titleRerecordBtn = "Загрузить другой файл",
    titleContinueBtn = "Начать анализ репетиции",
    titleHelpForInput = "Задайте название",
    onClickRerecordBtn,
}: IPreviewBlock) {
    const cnPreview = cn("cnPreview");
    const navigate = useNavigate();

    //for content modal
    const [isSendVideo, setIsSendVideo] = useState(false);

    // for input
    const [isFileNameValid, setFilenamevalid] = useState(true);
    const [fileName, setFileName] = useState("");

    // get videofile from content
    const { currentFile, setCurrentFile } = useContext(VideoUploadContext);
    const [durationVideo, setDurationVideo] = useState(0);
    const [sizeVideo, setSizeVideo] = useState(0);
    const [canMoved, setCanMoved] = useState(false);

    //  for sending video to server
    const [videoSendRequest, videoSendResponse] = useSendVideoMutation();
    const { isLoading, isSuccess, isError } = videoSendResponse;

    const videoRef = useRef<HTMLVideoElement | any>();
    let mediaSource = new MediaSource();
    const mimeCodec = "video/mp4";

    function sourceOpen() {
        // console.log(mediaSource.readyState); // open
        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

        const getBuff = async () => {
            const buf = await currentFile.arrayBuffer();
            sourceBuffer.appendBuffer(buf);

            sourceBuffer.addEventListener("updateend", () => {
                mediaSource.endOfStream();
                // console.log(mediaSource.readyState); // ended
            });
        };
        getBuff();
    }

    useEffect(() => {
        if ("MediaSource" in window && videoRef.current) {
            try {
                videoRef.current.srcObject = mediaSource;
                // console.log(videoRef.current)
            } catch (error) {
                videoRef.current.src = URL.createObjectURL(currentFile);
                // console.log("mediasource", error, videoRef.current)
            }
            mediaSource.addEventListener("sourceopen ", sourceOpen);
        } else {
            // console.error("Unsupported MIME type or codec: ", mimeCodec);
        }
    }, [videoRef.current]);

    const getDurationVideo = (n: number) => {
        
        if (!n) return;
        console.log(n)
        if (n === 0 && (currentFile.size === 0)) return;
        if(n === Infinity) setDurationVideo(0);
        else setDurationVideo(n);
        const normDuration = getPrettyDuration(durationVideo);
        if (normDuration < NORM_COUNT_MINUTES) setCanMoved(true);
    };

    useEffect(() => {
        if (currentFile && currentFile.size > 0) setSizeVideo(currentFile.size);
    }, [currentFile]);

    const clickUpload = async () => {
        if (canMoved) {
            setIsSendVideo(true);
            await videoSendRequest({
                title: fileName,
                duration: durationVideo + "",
                description: "",
                file: currentFile,
            });
            navigate(RoutesEnum.DIARY)
        }
    };

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);

    // answers from back
    useEffect(() => {
        if (isSuccess) {
            const data = videoSendResponse.data;
            if (data.success) {
                // console.log(data);
                setCurrentFile(new File([], "empty")); //
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
                        <ReactPlayer
                            width={"100%"}
                            height="100%"
                            ref={videoRef}
                            url={URL.createObjectURL(currentFile)}
                            muted={true}
                            controls={true}
                            onDuration={getDurationVideo}
                        />
                    </div>
                </div>

                <div className={cnPreview("col")}>
                    <div className={cnPreview("title")}>
                        <span className={cnPreview("title-videoname")}>
                            {currentFile.name}
                        </span>
                        <span className={cnPreview("title-characters")}>
                            {sizeVideo && getPrettySizeFile(sizeVideo)} •{" "}
                            {durationVideo && getPrettyDuration(durationVideo)}{" "}
                            минут
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
            {!canMoved && (
                <div className={cnPreview("error")}>
                    <div className={cnPreview("row")}>
                        <div className={cnPreview("error-icon")}>
                            <ReactSVG src={videoRemoveIcon} />
                        </div>
                        <div className={cnPreview("col")}>
                            <span className={cnPreview("error-text-red")}>
                                Ой, кажется, это видео слишком длинное!
                            </span>
                            <span className={cnPreview("error-text")}>
                                Мы можем проанализировать ваше видео, только
                                если его длительность не превышает 15 минут.
                            </span>
                        </div>
                    </div>
                </div>
            )}
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
                            className={cnPreview("btn-blue", {
                                error: !canMoved,
                            })}
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
