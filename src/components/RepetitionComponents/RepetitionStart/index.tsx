import { cn } from "@bem-react/classname";
import "./style.scss";

import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import downloand_btn from "./img/download_btn.svg";
import online_btn from "./img/online_btn.svg";

import { Link } from "react-router-dom";
import ModalWindow from "../../ModalWindow/ModalWindow";

import Upload from "../../Upload";

import closeIcon from "./assets/close.svg";
import uploadIcon from "./assets/document-upload.svg";




export default function RepetitionStart() {
    const cnRepetitionStart = cn("RepetitionStart");
    const cnModalTitle = cn("ModalTitle");

    const [isModal, setModal] = useState(false);
    // const [modalVideo, setModalVideo] = useState<Item>(items[0]);


    const showModal = () => {
        setModal(true);
    };

    return (
        <div>
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

            <ModalWindow isVisible={isModal} onClose={() => setModal(false)}>
                <div className={cnModalTitle("header")}>
                    <ReactSVG
                        src={uploadIcon}
                        className={cnModalTitle("header-icon")}
                    />
                    <span className={cnModalTitle("header-title")}>
                        Загрузка репетиции
                    </span>

                    <ReactSVG
                        src={closeIcon}
                        className={cnModalTitle("header-icon-close")}
                        onClick={() => setModal(false)}
                    />
                </div>
                <Upload />
            </ModalWindow>

        </div>
    );
}
