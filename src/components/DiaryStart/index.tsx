import { useEffect, useMemo, useState } from "react";
import { IVideoFromBack, IVideoStatus } from "../../models/video";

import {
    useGetVideoByUserQuery,
    useGetVideoStatusByUserQuery,
    useLazyGetVideoByUserSearchQuery,
} from "../../store/api/userVideo";

import StatsGraph from "../Graphs/Stats";
import ArchiveSearch from "../Archive/ArchiveSearch";

import Pagination from "../Pagination";
import RollUp from "../RollUp";
import AimBlock from "../AimBlock";
import Tabs, { TYPE_TABS } from "../Tabs";

import statisticIcon from "./icons/statistic.svg";
import videoListIcon from "./icons/videolist.svg";

import { cn } from "@bem-react/classname";

import BadGoodBlock, { TYPE_ACHIEVEMENTS } from "../BadGoodBlock";
import BlockGeneralAnalytics from "../BlockGeneralAnalytics";

import "./style.scss";
import ArchiveVideoItem from "../Archive/ArchiveVideoItem";

import {
    useGetAchievementsQuery,
    useGetStatisticDataQuery,
} from "../../store/api/diary";
import { IAchievement, IStatisticItem, TYPE_DIARY } from "../../models/diary";

import lampСharge from "./icons/lampСharge.svg";
import RecommendationDairyGraph from "../RecommendationDairyGraph";
import VideoLoad from "../VideoLoad";
import ArchiveVideo from "../Archive/ArchiveVideo";

const sectionTitles = {
    total: "Общий результат",
    connectivity: "Связность",
    argumentativeness: "Аргументированность",
    clarity: "Ясность",
    dynamism: "Динамизм",
    persuasiveness: "Убедительность",
    communicative: "Коммуникативные нормы",
};

export default function DiaryStart() {
    const cnDiaryStart = cn("DiaryStart");

    const [currentPage, setCurrentPage] = useState(0);
    const videosPerPage = 6;

    /* ----------------------- ACHIEVEMENTS BLOCK -----------------------*/
    const achievementsJSON = useGetAchievementsQuery();
    const [achievementsData, setAchievementsData] = useState<IAchievement>();

    useEffect(() => {
        if (
            achievementsJSON &&
            achievementsJSON.isSuccess &&
            achievementsJSON.data &&
            achievementsJSON.data.data
        ) {
            // console.log(achievementsJSON.data!.data!);
            setAchievementsData(achievementsJSON.data!.data!);
        }
    }, [achievementsJSON]);

    /* ----------------------- STATS GRAPH BLOCK -----------------------*/
    const [statsData, setStatsData] = useState({
        total: [] as IStatisticItem[],
        connectivity: [] as IStatisticItem[],
        argumentativeness: [] as IStatisticItem[],
        clarity: [] as IStatisticItem[],
        dynamism: [] as IStatisticItem[],
        persuasiveness: [] as IStatisticItem[],
        communicative: [] as IStatisticItem[],
    });

    const totalJSON = useGetStatisticDataQuery(TYPE_DIARY.total);
    const connectivityJSON = useGetStatisticDataQuery(TYPE_DIARY.connectivity);
    const argumentativenessJSON = useGetStatisticDataQuery(
        TYPE_DIARY.argumentativeness
    );
    const clarityJSON = useGetStatisticDataQuery(TYPE_DIARY.clarity);
    const dynamismJSON = useGetStatisticDataQuery(TYPE_DIARY.dynamism);
    const persuasivenessJSON = useGetStatisticDataQuery(
        TYPE_DIARY.persuasiveness
    );
    const communicativeJSON = useGetStatisticDataQuery(
        TYPE_DIARY.communicative
    );

    useEffect(() => {
        if (totalJSON && totalJSON.isSuccess && totalJSON.data.data) {
            setStatsData((prev) => ({
                ...prev,
                total: totalJSON.data.data!.values,
            }));
        }
    }, [totalJSON]);

    useEffect(() => {
        if (
            connectivityJSON &&
            connectivityJSON.isSuccess &&
            connectivityJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                connectivity: connectivityJSON.data.data!.values,
            }));
        }
    }, [connectivityJSON]);

    useEffect(() => {
        if (
            argumentativenessJSON &&
            argumentativenessJSON.isSuccess &&
            argumentativenessJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                argumentativeness: argumentativenessJSON.data.data!.values,
            }));
        }
    }, [argumentativenessJSON]);

    useEffect(() => {
        if (clarityJSON && clarityJSON.isSuccess && clarityJSON.data.data) {
            setStatsData((prev) => ({
                ...prev,
                clarity: clarityJSON.data.data!.values,
            }));
        }
    }, [clarityJSON]);

    useEffect(() => {
        if (dynamismJSON && dynamismJSON.isSuccess && dynamismJSON.data.data) {
            setStatsData((prev) => ({
                ...prev,
                dynamism: dynamismJSON.data.data!.values,
            }));
        }
    }, [dynamismJSON]);

    useEffect(() => {
        if (
            persuasivenessJSON &&
            persuasivenessJSON.isSuccess &&
            persuasivenessJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                persuasiveness: persuasivenessJSON.data.data!.values,
            }));
        }
    }, [persuasivenessJSON]);

    useEffect(() => {
        if (
            communicativeJSON &&
            communicativeJSON.isSuccess &&
            communicativeJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                communicative: communicativeJSON.data.data!.values,
            }));
        }
    }, [communicativeJSON]);

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

    /* ----------------------------- STATUS ------------------------------*/

    const INTERVAL_PULLING = 60000; // milliseconds

    const { data } = useGetVideoStatusByUserQuery(
        {
            page: 1,
            limit: 6,
        },
        {
            pollingInterval: INTERVAL_PULLING,
        }
    );

    const currentStatus = useMemo(() => {
        if (data && data?.data) {
            return data!.data!.videos;
        } else return [];
    }, [data]);

    return (
        <div>
            <div className={cnDiaryStart("text-h1", { margin_bottom: true })}>
                Достижения
            </div>
            <div className={cnDiaryStart("banner")}>
                {achievementsData && (
                    <BlockGeneralAnalytics
                        rank={achievementsData.rank}
                        previous_rank={achievementsData.previous_rank}
                        text={achievementsData.text}
                    />
                )}
            </div>

            <div className={cnDiaryStart("aims")}>
                <AimBlock />
            </div>

            <RollUp title="Видео на анализе" icon={videoListIcon}>
                {/* данные по видосикам на анализе которые */}
                {currentStatus ? (
                    currentStatus.map((el, ind) => (
                        <VideoLoad
                            key={ind}
                            el={el}
                            ind={ind}
                            percent={el.status_percent}
                        />
                    ))
                ) : (
                    <div>Нет видео на анализе</div>
                )}
            </RollUp>

            <RollUp title="Статистика за неделю" icon={statisticIcon}>
                <div className={cnDiaryStart("row")}>
                    {achievementsData && (
                        <>
                            <BadGoodBlock
                                type={TYPE_ACHIEVEMENTS.improvements}
                                text={achievementsData.improvements}
                            />
                            <BadGoodBlock
                                type={TYPE_ACHIEVEMENTS.deterioration}
                                text={achievementsData.deterioration}
                            />
                        </>
                    )}
                </div>

                <Tabs type={TYPE_TABS.PERCENT}>
                    {statsData &&
                        sectionTitles &&
                        Object.entries(sectionTitles).map(
                            ([key, value], idx) => (
                                <div
                                    key={idx}
                                    data-title={value}
                                    data-value="0%"
                                    style={{ width: "100%" }}
                                >
                                    <StatsGraph
                                        data={[
                                            ...statsData[
                                                key as keyof typeof statsData
                                            ],
                                        ].reverse()}
                                    />
                                    <RecommendationDairyGraph
                                        icon={lampСharge}
                                    />
                                </div>
                            )
                        )}
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

            {searchVideos ? (
                <>
                    <ArchiveSearch updateSearch={updateSearch} />
                    <ArchiveVideo video={searchVideos} />
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
