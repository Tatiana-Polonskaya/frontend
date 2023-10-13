import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import ModalWindow from "../../ModalWindow/ModalWindow";
import Upload from "../../Upload";
import PreviewBlock from "../../PreviewBlock";

import { cn } from "@bem-react/classname";
import "./style.scss";

import { ReactSVG } from "react-svg";
import uploadPicture from "./img/uploadBtn.svg";
import onlinePicture from "./img/onlineBtn.svg";
import notice_btn from "../Setup/icons/note_icon.svg";
import loadingPic from "./img/loading.svg";

import { useSendVideoMutation } from "../../../store/api/userVideo";
import RoutesEnum, { NestedRepetition } from "../../../models/routes";
import {
    MAX_MINUTES_FOR_VIDEO,
    MIN_MINUTES_FOR_VIDEO,
} from "../../../constants";
import LargeButton from "../-LargeButton";
import Button from "../../ui-kit/Button";

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
    const navigate = useNavigate();

    /* ------------------------ UPLOADING MODAL ------------------------ */

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

    /* ------------------------ LOADING MODAL ------------------------ */
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const showLoadingModal = async () => {
        setIsLoadingModal(true);
    };

    const closeLoadingModal = () => {
        setIsLoadingModal(false);
    };

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

    const sendVideoData = async () => {
        if (currentInfoData) {
            await videoSendRequest(currentInfoData);
            // navigate(RoutesEnum.DIARY);
        }
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
            console.log(videoSendResponse.error);
            setCurrentFile(new File([], "empty"));
            setCurrentInfoData(initialInfoVideo);
        }
    }, [isError]);

    /* ------------------------ BUTTON CONTENT ------------------------ */

    const BUTTON_CONTENT = [
        {
            id: 0,
            img: onlinePicture,
            title: "Онлайн запись репетиции",
            banTitle: "Упс.. доступных репетиций пока нет",
            onClick: () =>
                navigate(RoutesEnum.REPETITION + "/" + NestedRepetition.SETUP),
            className: cnRepetitionStart("btn-block-link-blue"),
        },
        {
            id: 1,
            img: uploadPicture,
            title: "Загрузка репетиции",
            banTitle: "Упс.. доступных загрузок пока нет",
            onClick: () => showModal(),
            className: cnRepetitionStart("btn-block-link-white"),
        },
    ];

    /* ------------------------ BAN UPLOADING AND RECORDING ------------------------ */

    const BAN_DESC =
        "Оформите подходящий тариф прямо сейчас, чтобы избавиться от всех ограничений!";

    const [isBan, setIsBan] = useState(false); // TODO: добавить получение на количество лимитов для загрузки

    useEffect(() => {
        setIsBan(false);
    }, []);

    /* ------------------------ CODE ------------------------ */

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
                {BUTTON_CONTENT.map((item) => (
                    <div
                        key={item.id}
                        className={cnRepetitionStart("btn-block-link")}
                    >
                        <LargeButton
                            img={item.img}
                            onClick={item.onClick}
                            className={item.className}
                            isBan={isBan}
                        >
                            <div
                                className={cnRepetitionStart(
                                    "btn-block-link-container"
                                )}
                                style={{ padding: isBan ? "16px 0" : "50px 0" }}
                            >
                                <div
                                    className={cnRepetitionStart(
                                        "btn-block-link-title",
                                        { opacity: isBan }
                                    )}
                                >
                                    {item.title}
                                </div>
                                {isBan && (
                                    <>
                                        <div
                                            className={cnRepetitionStart(
                                                "btn-block-link-ban",
                                                { gray: Boolean(item.id) }
                                            )}
                                        >
                                            {item.banTitle}
                                        </div>
                                        <div
                                            className={cnRepetitionStart(
                                                "btn-block-link-ban",
                                                { gray: Boolean(item.id) }
                                            )}
                                        >
                                            {BAN_DESC}
                                        </div>
                                        <Button
                                            className={cnRepetitionStart(
                                                "btn-block-link-btn"
                                            )}
                                        >
                                            Выбрать тариф
                                        </Button>
                                    </>
                                )}
                            </div>
                        </LargeButton>
                    </div>
                ))}
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
