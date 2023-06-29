import React, { useEffect, useState } from "react";
import "./style.scss";
import VideoItem from "./VideoItem";
import Padination from "../Pagination";
import { cn } from "@bem-react/classname";
import ModalWindow from "../ModalWindow/ModalWindow";

type Item = {
    id: number;
    img: string;
    title: string;
    author: string;
    avatar: string;
    views: number;
    publication_time: string;
    annotation?: string;
};

const items = [
    {
        id: 0,
        img: "/images/video0.png",
        title: "3 способа навести порядок в своей жизни",
        author: "Мария Семенидова",
        avatar: "/images/video0.png",
        views: 6500,
        publication_time: "6 дней назад",
    },
    {
        id: 1,
        img: "/images/video1.png",
        title: "3 способа навести порядок в своей жизни. Начни с себя.",
        author: "Милош Сахаренко",
        avatar: "/images/video1.png",
        views: 6500,
        publication_time: "05.01.2023",
    },
    {
        id: 2,
        img: "/images/video2.png",
        title: "Основные психологическе приемы, чтобы найти общий язык с любым человеком",
        author: "Павел Захаров",
        avatar: "/images/video2.png",
        views: 6500,
        publication_time: "05.01.2023",
    },
    {
        id: 3,
        img: "/images/video3.png",
        title: "Как начать выступление? 3 приема начала публичной речи как в TED",
        author: "Мария Янушкина",
        avatar: "/images/video3.png",
        views: 6500,
        publication_time: "05.01.2023",
    },
    {
        id: 4,
        img: "/images/video4.png",
        title: "РОДИТЕЛИ И ДЕТИ - ПРИЧИНЫ ПРОБЛЕМ ВО ВЗАИМООТНОШЕНИЯХ | Ошибки Родителей | Психология",
        author: "Источник",
        avatar: "/images/video4.png",
        views: 6500,
        publication_time: "05.01.2023",
        annotation:
            "Добрый день, уважаемые зрители. Каждый человек за всю жизнь состоит во множестве отношений, но самые крепкие отношения складываются у нас с родителями. Поговорим о причинах проблем, которые могут возникнуть. Добрый день, уважаемые зрители. Каждый человек за всю жизнь состоит во множестве отношений, но самые крепкие отношения складываются у нас с родителями. Поговорим о причинах проблем, которые могут возникнуть.Добрый день, уважаемые зрители. Каждый человек за всю жизнь состоит во множестве отношений, но самые крепкие отношения складываются у нас с родителями. Поговорим о причинах проблем, которые могут возникнуть. Добрый день, уважаемые зрители. Каждый человек за всю жизнь состоит во множестве отношений, но самые крепкие отношения складываются у нас с родителями. Поговорим о причинах проблем, которые могут возникнуть. Добрый день, уважаемые зрители. Каждый человек за всю жизнь состоит во множестве отношений, но самые крепкие отношения складываются у нас с родителями. Поговорим о причинах проблем, которые могут возникнуть.Добрый день, уважаемые зрители. Каждый человек за всю жизнь состоит во множестве отношений, но самые крепкие отношения складываются у нас с родителями. Поговорим о причинах проблем, которые могут возникнуть.",
    },
    {
        id: 5,
        img: "/images/video1.png",
        title: "РОДИТЕЛИ И ДЕТИ - ПРИЧИНЫ ПРОБЛЕМ ВО ВЗАИМООТНОШЕНИЯХ | Ошибки Родителей | Психология",
        author: "Анна Эгамова",
        avatar: "/images/video2.png",
        views: 6500,
        publication_time: "05.01.2023",
    },
];

const analyzeItem = {
    id: 0,
    criteria: [
        {
            title: "связность",
            value: 64,
        },
        {
            title: "убедительность",
            value: 92,
        },
        {
            title: "аргументированность",
            value: 81,
        },
        {
            title: "ясность",
            value: 67,
        },
        {
            title: "динамизм",
            value: 76,
        },
        {
            title: "привлечение внимания аудитории",
            value: 76,
        },
    ],
};

export default function VideoBlock() {
    //useState for paggination
    const [videos, setVideos] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(6);

    //useState for modal window
    const [isModal, setModal] = useState(false);
    const [modalVideo, setModalVideo] = useState<Item>(items[0]);

    useEffect(() => {
        const getVideos = async () => {
            setLoading(true);
            // загрузка данных из апи - пока нет
            setVideos(items);
            setLoading(false);
        };
        getVideos();
    }, []);

    //paggination

    const lastVideoIndex = currentPage * videosPerPage;
    const firsrtVideoIndex = lastVideoIndex - videosPerPage;
    const currentVideos = videos.slice(firsrtVideoIndex, lastVideoIndex);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = (maxPage: number) =>
        setCurrentPage((prev) => (prev < maxPage ? prev + 1 : prev));

    const prevPage = () =>
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

    //function for open modal window with element

    const clickOnVideo = (el: Item) => {
        setModalVideo(el);
        setModal(true);
    };

    //styles

    const cnVideos = cn("video-block");
    const cnModalContent = cn("modal-content");

    return (
        <div className={cnVideos()}>
            <div className={cnVideos("video-grid")}>
                {currentVideos.map((el) => (
                    <VideoItem
                        key={el.id}
                        item={el}
                        clickFunction={() => clickOnVideo(el)}
                    />
                ))}
            </div>

            <Padination
                videosPerPage={videosPerPage}
                totalVideos={videos.length}
                paginate={paginate}
                funcNextPage={nextPage}
                funcPrevPage={prevPage}
                currentPage={currentPage}
            />

            <ModalWindow isVisible={isModal} onClose={() => setModal(false)}>
                <div className={cnModalContent()}>
                    <div className={cnModalContent("video-row")}>
                        <div
                            className={cnModalContent("video-row-videoplayer")}
                        >
                            <img src={modalVideo.img} alt="video" />
                        </div>

                        <div
                            className={cnModalContent("video-row-description")}
                        >
                            <div
                                className={cnModalContent(
                                    "video-row-description-title-row"
                                )}
                            >
                                <p
                                    className={cnModalContent(
                                        "video-row-description-title-row-text"
                                    )}
                                >
                                    {modalVideo.title}
                                </p>

                                <p>
                                    <img
                                        src="/images/button-close.svg"
                                        className={cnModalContent(
                                            "video-row-description-title-row-closebutton"
                                        )}
                                        onClick={() => setModal(false)}
                                        alt="close"
                                    />
                                </p>
                            </div>
                            <p
                                className={cnModalContent(
                                    "video-row-description-times"
                                )}
                            >
                                {modalVideo.publication_time}
                            </p>

                            <div
                                className={cnModalContent(
                                    "video-row-description-author-block"
                                )}
                            >
                                <div
                                    className={cnModalContent(
                                        "video-row-description-author-block-logo"
                                    )}
                                >
                                    <img
                                        className={cnModalContent(
                                            "video-row-description-author-block-logo-img"
                                        )}
                                        src={modalVideo.avatar}
                                        alt=""
                                    />
                                </div>
                                <p
                                    className={cnModalContent(
                                        "video-row-description-author-block-name"
                                    )}
                                >
                                    {modalVideo.author}
                                </p>
                            </div>

                            <p
                                className={cnModalContent(
                                    "video-row-description-annotation-title"
                                )}
                            >
                                Аннотация
                            </p>
                            <div
                                className={cnModalContent(
                                    "video-row-description-annotation-text"
                                )}
                            >
                                {modalVideo.annotation}
                            </div>

                            <button
                                className={cnModalContent(
                                    "video-row-description-btn-info"
                                )}
                            >
                                Подробные результаты анализа ►
                            </button>
                        </div>
                    </div>

                    <div className={cnModalContent("analyze-row")}>
                        {analyzeItem.id === modalVideo.id && (
                            <>
                                {analyzeItem.criteria.map((item) => (
                                    <div
                                        key={1}
                                        className={cnModalContent(
                                            "analyze-row-item"
                                        )}
                                    >
                                        <div
                                            className="pie animate"
                                            style={
                                                {
                                                    "--p": item.value,
                                                } as React.CSSProperties
                                            }
                                        >
                                            {item.value}%
                                        </div>
                                        <p>{item.title}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
}
