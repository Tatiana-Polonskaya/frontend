import { useEffect, useMemo, useState } from "react";
import { IVideoFromBack } from "../../models/video";

import {
    useGetVideoByUserQuery,
    useLazyGetVideoByUserSearchQuery,
} from "../../store/api/userVideo";

import stats from "./../../plugs/stats.json";

import StatsGraph from "../Graphs/Stats";
import ArchiveSearch from "../Archive/ArchiveSearch";
import ArchiveVideo from "../Archive/ArchiveVideo";
import Pagination from "../Pagination";
import RollUp from "../RollUp";
import AimBlock from "../AimBlock";
import Tabs, { TYPE_TABS } from "../Tabs";

import statisticIcon from "./icons/statistic.svg";
import videoListIcon from "./icons/videolist.svg";

import { cn } from "@bem-react/classname";

import BadGoodBlock from "../BadGoodBlock";
import BlockGeneralAnalytics from "../BlockGeneralAnalytics";

import "./style.scss";
import ArchiveVideoItem from "../Archive/ArchiveVideoItem";

const sectionNames = [
    "Общий результат",
    "Связность",
    "Аргументированность",
    "Ясность",
    "Динамизм",
    "Убедительность",
    "Коммуникативные нормы",
];

const achievementsData = [
    {
        rank: "Основательный оратор",
        previous_rank: "последовательный говорун",
        text: "Твои аргументы прочны как скала. Продолжай идти к своей цели!",
    },
];

const weeklyStatistics = [
    {
        improvements: [
            "Связность твоих высказываний увеличилась",
            "Темп речи выровнялся",
            "Ты чаще проявляешь положительные эмоции",
        ],
        deterioration: [],
    },
];

export default function DiaryStart() {
    const cnDiaryStart = cn("DiaryStart");

    const [currentPage, setCurrentPage] = useState(0);
    const videosPerPage = 6;

    /* ----------------------- GETTING VIDEO BLOCK -----------------------*/

    const [countUserVideos, setCountUserVideos] = useState<number>(0);

    const videosDataFromBack = useGetVideoByUserQuery({
        page: currentPage,
        limit: videosPerPage,
    });

    useEffect(() => {
        if (
            videosDataFromBack &&
            videosDataFromBack.data &&
            videosDataFromBack.data!.data
        ) {
            setCountUserVideos(videosDataFromBack.data!.data!.total_videos);
            setCountSearchVideos(videosDataFromBack.data!.data!.total_videos);
            setSearchVideos(videosDataFromBack.data!.data!.videos);
        }
    }, [videosDataFromBack]);

    /* ----------------------- RESEARCH BLOCK -----------------------*/

    const [searchValue, setSearchValue] = useState<string>();
    const [searchVideos, setSearchVideos] = useState<IVideoFromBack[]>();

    const [countSearchVideos, setCountSearchVideos] = useState<number>(0);

    const [getVideosBySearch, videosBySearch] =
        useLazyGetVideoByUserSearchQuery();

    const updateSearch = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => {
        if (typeof searchValue === "string") {
            getVideosBySearch({
                page: currentPage,
                limit: videosPerPage,
                search: searchValue,
            });
        }
    }, [currentPage, getVideosBySearch, searchValue]);

    useEffect(() => {
        if (
            videosBySearch &&
            videosBySearch.isSuccess &&
            videosBySearch.data &&
            videosBySearch.data!.data
        ) {
            console.log(videosBySearch.data!.data!);
            setSearchVideos(videosBySearch.data!.data!.videos);
            setCountSearchVideos(videosBySearch.data!.data!.total_videos);
        }
    }, [videosBySearch]);

    /* ----------------------- PAGINATION BLOCK -----------------------*/

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = (maxPage: number) =>
        setCurrentPage((prev) => (prev < maxPage - 1 ? prev + 1 : prev));

    const prevPage = () =>
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

    const removeItem = (id: string) => {
        console.log("removed");
    };

    return (
        <div>
            <div className={cnDiaryStart("text-h1", { margin_bottom: true })}>
                Достижения
            </div>
            <div className={cnDiaryStart("banner")}>
                <BlockGeneralAnalytics
                    N={9}
                    rank={"Последовательный"}
                    text={
                        "Твои аргументы прочны как скала. Продолжай идти к своей цели!"
                    }
                />
            </div>

            <div className={cnDiaryStart("aims")}>
                <AimBlock />
            </div>

            <RollUp title="Видео на анализе" icon={videoListIcon}>
                <div>Нет видео на анализе</div>
            </RollUp>
            <RollUp title="Статистика за неделю" icon={statisticIcon}>
                <div className={cnDiaryStart("row")}>
                    <BadGoodBlock />
                    <BadGoodBlock />
                </div>

                <Tabs type={TYPE_TABS.PERCENT}>
                    {sectionNames.map((el, idx) => (
                        <div
                            key={idx}
                            data-title={el}
                            data-value="0%"
                            style={{ width: "100%" }}
                        >
                            <StatsGraph data={stats.data.values} />
                        </div>
                    ))}
                </Tabs>
            </RollUp>

            <div>
                <div className={cnDiaryStart("text-h1")}>
                    Архив проверок{" "}
                    {countUserVideos && (
                        <span className={cnDiaryStart("text-gray")}>
                            {countUserVideos}
                        </span>
                    )}
                </div>
            </div>

            {/* <ArchiveSearch updateSearch={updateSearch} />

            {searchVideos &&
                searchVideos.map((el, idx) => (
                    <ArchiveVideoItem
                        handleClick={removeItem}
                        key={el.id}
                        el={el}
                        ind={idx}
                    />
                ))} */}
            {searchVideos ? (
                <>
                    <ArchiveSearch updateSearch={updateSearch} />
                    {searchVideos.map((el, ind) => (
                        <ArchiveVideoItem
                            handleClick={removeItem}
                            key={el.id}
                            el={el}
                            ind={ind}
                            visible={ind !== 0 ? true : false}
                        />
                    ))}
                </>
            ) : (
                <div className={cnDiaryStart("text-empty-msg")}>
                    Видео не найдено
                </div>
            )}

            {searchVideos && (
                <Pagination
                    videosPerPage={videosPerPage}
                    totalVideos={countSearchVideos}
                    paginate={paginate}
                    funcNextPage={nextPage}
                    funcPrevPage={prevPage}
                    currentPage={currentPage + 1}
                />
            )}
        </div>
    );
}
