import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import ModalWindow from "../../ModalWindow/ModalWindow";
import Upload from "../../Upload";
import PreviewBlock from "../../PreviewBlock";

import { cn } from "@bem-react/classname";
import "./style.scss";

import { ReactSVG } from "react-svg";
import downloand_btn from "./img/download_btn.svg";
import online_btn from "./img/online_btn.svg";
import notice_btn from "../Setup/icons/note_icon.svg";
import loadingPic from "./img/loading.svg";

import { useSendVideoMutation } from "../../../store/api/userVideo";
import RoutesEnum from "../../../models/routes";
import {
    MAX_MINUTES_FOR_VIDEO,
    MIN_MINUTES_FOR_VIDEO,
} from "../../../constants";

export interface IInfoVideo {
    title: string;
    duration: string;
    description: string;
    file: File;
}

export const initialInfoVideo: IInfoVideo = {
    title: "",
    duration: "",
    description: "",
    file: new File([], "empty"),
};

export const VideoUploadContext = createContext({
    currentFile: new File([], "empty"),
    setCurrentFile: (() => {}) as Dispatch<SetStateAction<File>>,
    currentInfoData: initialInfoVideo,
    setCurrentInfoData: (() => {}) as Dispatch<SetStateAction<IInfoVideo>>,
});

export default function RepetitionStart() {
    const cnRepetitionStart = cn("RepetitionStart");

    const [isModal, setModal] = useState(false);
    const [currentFile, setCurrentFile] = useState<File>(new File([], "empty"));

    const showModal = async () => {
        setCurrentFile(new File([], "empty"));
        setModal(true);
    };

    const closeModal = () => {
        setCurrentFile(new File([], "empty"));
        setModal(false);
    };

    // loading modal
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [currentInfoData, setCurrentInfoData] =
        useState<IInfoVideo>(initialInfoVideo);

    useEffect(() => {
        if (currentInfoData && currentInfoData.title.length > 0) {
            sendVideoData();
            closeModal();
            showLoadingModal();
        }
    }, [currentInfoData]);

    const [videoSendRequest, videoSendResponse] = useSendVideoMutation();
    const { isLoading, isSuccess, isError } = videoSendResponse;
    const [isErrorWithSuccess, setIsErrorWithSuccess] = useState(false);

    const navigate = useNavigate();

    const sendVideoData = async () => {
        if (currentInfoData) {
            await videoSendRequest(currentInfoData);
            // navigate(RoutesEnum.DIARY);
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
                setCurrentFile(new File([], "empty"));
                setCurrentInfoData(initialInfoVideo);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            // const error = videoSendResponse.error as Response;
            console.log(videoSendResponse.error);
            setCurrentFile(new File([], "empty"));
            setCurrentInfoData(initialInfoVideo);
        }
    }, [isError]);

    // const videoData  = useGetVideoQuery("feb81d20-2bb0-4622-b41a-3c6d50c6b3f8");

    return (
        <div className={cnRepetitionStart()}>
            <div className={cnRepetitionStart("text")}>
                <div className={cnRepetitionStart("text-dark-blue")}>
                    <ReactSVG src={notice_btn} />
                    Подготовка к репетиции
                </div>
                <div className={cnRepetitionStart("text-black")}>
                    Запишите репетицию прямо сейчас или загрузите имеющееся
                    видео.
                </div>
                <div className={cnRepetitionStart("text-gray")}>
                    <span className={cnRepetitionStart("text-gray-bold")}>
                        Онлайн запись репетиции:
                    </span>{" "}
                    при наличии веб-камеры и микрофона вы можете репетировать в
                    режиме онлайн прямо из сервиса.
                </div>
                <div className={cnRepetitionStart("text-gray")}>
                    <span className={cnRepetitionStart("text-gray-bold")}>
                        Загрузка репетиции:
                    </span>{" "}
                    если у вас имеется готовое видео, которое вы хотите
                    проанализировать - просто загрузите его с устройства.
                </div>
                <div className={cnRepetitionStart("text-blue")}>
                    Минимальная длительность видео - {MIN_MINUTES_FOR_VIDEO}{" "}
                    минуты, максимальная - {MAX_MINUTES_FOR_VIDEO}
                    {" минут"}.
                </div>
            </div>
            <div className={cnRepetitionStart("btn-block")}>
                <div className={cnRepetitionStart("btn-block-link")}>
                    <Link to="/repetition/setup">
                        <ReactSVG
                            src={online_btn}
                            className={cnRepetitionStart("btn-block-link-svg")}
                        />
                    </Link>
                </div>
                <div className={cnRepetitionStart("btn-block-link")}>
                    <ReactSVG
                        src={downloand_btn}
                        className={cnRepetitionStart("btn-block-link-svg")}
                        onClick={() => showModal()}
                    />
                </div>
            </div>

            <ModalWindow
                isVisible={isModal}
                onClose={closeModal}
                title={
                    currentFile && currentFile.size !== 0
                        ? "Предпросмотр загруженной репетиции"
                        : "Загрузка репетиции"
                }
            >
                <VideoUploadContext.Provider
                    value={{
                        currentFile,
                        setCurrentFile,
                        currentInfoData,
                        setCurrentInfoData,
                    }}
                >
                    {((currentFile && currentFile.size === 0) ||
                        !currentFile) && <Upload />}
                    {currentFile && currentFile.size !== 0 && (
                        <PreviewBlock
                            onClickRerecordBtn={() =>
                                setCurrentFile(new File([], ""))
                            }
                        />
                    )}
                </VideoUploadContext.Provider>
            </ModalWindow>

            <ModalWindow
                isVisible={isLoadingModal}
                onClose={closeLoadingModal}
                closeOnClickOutside={!isLoading || isErrorWithSuccess}
            >
                {(isLoading || isErrorWithSuccess || isError) && (
                    <div className={cnRepetitionStart("loading")}>
                        <ReactSVG
                            src={loadingPic}
                            className={cnRepetitionStart("loading-img")}
                        />
                        {isLoading && !(isErrorWithSuccess || isError) && (
                            <>
                                <div
                                    className={cnRepetitionStart(
                                        "loading-title"
                                    )}
                                >
                                    Идет загрузка видео{" "}
                                    <span
                                        className={cnRepetitionStart(
                                            "loading-title-animate"
                                        )}
                                    >
                                        {" "}
                                        . . .
                                    </span>
                                </div>
                                <div
                                    className={cnRepetitionStart(
                                        "loading-description"
                                    )}
                                >
                                    Пожалуйста, не закрывайте вкладку до
                                    окончания загрузки.
                                </div>
                            </>
                        )}
                        {(isErrorWithSuccess || isError) && (
                            <>
                                <div
                                    className={cnRepetitionStart(
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
                    <div className={cnRepetitionStart("loading")}>
                        <ReactSVG
                            src={loadingPic}
                            className={cnRepetitionStart("loading-img")}
                        />
                        <>
                            <div className={cnRepetitionStart("loading-title")}>
                                Загрузка видео успешно завершена и отправлена на
                                анализ
                            </div>
                            <div
                                className={cnRepetitionStart(
                                    "loading-description"
                                )}
                            >
                                По его окончании вы сможете ознакомиться с
                                результатами в разделе{" "}
                                <span
                                    className={cnRepetitionStart(
                                        "loading-title-link"
                                    )}
                                    onClick={() =>
                                        navigate(RoutesEnum.DIARY, {
                                            state: { onAnalisys: true },
                                        })
                                    }
                                >
                                    Дневник
                                </span>
                            </div>
                        </>
                    </div>
                )}
            </ModalWindow>
        </div>
    );
}
