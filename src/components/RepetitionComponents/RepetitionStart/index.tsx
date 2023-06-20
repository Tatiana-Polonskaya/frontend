import { cn } from "@bem-react/classname";
import "./style.scss";

import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";
import { ReactSVG } from "react-svg";

import downloand_btn from "./img/download_btn.svg";
import online_btn from "./img/online_btn.svg";

import { Link } from "react-router-dom";
import ModalWindow from "../../ModalWindow/ModalWindow";

import Upload from "../../Upload";

import PreviewBlock from "../../PreviewBlock";
import {
    useGetVideoByIdQuery,
    useLazyGetVideoByIdQuery,
} from "../../../store/api/userVideo";

export const VideoUploadContext = createContext({
    currentFile: new File([], "empty"),
    setCurrentFile: (() => {}) as Dispatch<SetStateAction<File>>,
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

    useEffect(() => {
        if (currentFile && currentFile.size !== 0)
            console.log(
                "RepetitionStart: currentFile was been changed:",
                currentFile
            );
    }, [currentFile]);
    console.log(currentFile)

    // const videoData  = useGetVideoQuery("feb81d20-2bb0-4622-b41a-3c6d50c6b3f8");

    return (
        <div className={cnRepetitionStart()}>
            {/* <video src={`api/video/feb81d20-2bb0-4622-b41a-3c6d50c6b3f8.mp4`} controls></video> */}
            <div className={cnRepetitionStart("text")}>
                <div className={cnRepetitionStart("text-dark-blue")}>
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
                    Максимальная длительность видео - 15 минут.
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
                        :  "Загрузка репетиции"
                }
            >
                <VideoUploadContext.Provider
                    value={{ currentFile, setCurrentFile }}
                >
                    {((currentFile && currentFile.size === 0) || (!currentFile) ) && <Upload />}
                    {currentFile && currentFile.size !== 0 && (
                        <PreviewBlock
                            onClickRerecordBtn={() =>
                                setCurrentFile(new File([], ""))
                            }
                        />
                    )}
                </VideoUploadContext.Provider>
            </ModalWindow>
        </div>
    );
}
