import { useEffect, useState } from "react";
import { IVideoFromBack } from "../../models/video";

import { useGetVideoByUserQuery } from "../../store/api/userVideo";

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

const sectionNames = [
    "Общий результат",
    "Связность",
    "Аргументированность",
    "Ясность",
    "Динамизм",
    "Убедительность",
    "Коммуникативные нормы",
];

export default function DiaryStart() {
    const cnDiaryStart = cn("DiaryStart");

    /* ----------------------- GETTING VIDEO BLOCK -----------------------*/
    // getting all video for users
    const videosDataFromBack = useGetVideoByUserQuery({page:0,limit:6});
    const [allUserVideos, setAllUserVideos] = useState<IVideoFromBack[]>();

    useEffect(() => {
        if (videosDataFromBack && videosDataFromBack.data) {
            setAllUserVideos(videosDataFromBack.data!.data!.videos);
        }
    }, [videosDataFromBack]);

    // const userVideos = data?.data?.videos as IVideoFromBack[];

    /* ----------------------- RESEARCH BLOCK -----------------------*/
    // researching video
    const [searchValue, setSearchValue] = useState("");
    const [searchVideos, setSearchVideos] = useState<IVideoFromBack[]>();

    const updateSearch = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => {
        if (allUserVideos) {
            if (searchValue.length > 0)
                setSearchVideos(
                    allUserVideos.filter(
                        (el) => el.title.indexOf(searchValue) !== -1
                    )
                );
            else setSearchVideos(allUserVideos);
        }
    }, [allUserVideos, searchValue]);

    // let result = allUserVideos;
    // if (allUserVideos && searchValue !== "") {
    //     // сделать частичное совпадение динамичным
    //     result =
    // }

    /* ----------------------- PAGINATION BLOCK -----------------------*/
    //useState for paggination
    // const [videos, setVideos] = useState<IVideoFromBack[]>([]);
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 6;

    //paggination
    const lastVideoIndex = currentPage * videosPerPage;
    const firsrtVideoIndex = lastVideoIndex - videosPerPage;
    const [currentVideos, setCurrentVideos] = useState<IVideoFromBack[]>();

    useEffect(() => {
        if (searchVideos)
            setCurrentVideos(
                searchVideos.slice(firsrtVideoIndex, lastVideoIndex)
            );
    }, [searchVideos, firsrtVideoIndex, lastVideoIndex]);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = (maxPage: number) =>
        setCurrentPage((prev) => (prev < maxPage ? prev + 1 : prev));

    const prevPage = () =>
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <div>
            <div className={cnDiaryStart("text-h1")}>Достижения</div>
            <div className={cnDiaryStart("banner")}>
                <BlockGeneralAnalytics N={9} rank={"sdvsd"} />
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
                    {allUserVideos && (
                        <span className={cnDiaryStart("text-gray")}>
                            {allUserVideos.length}
                        </span>
                    )}
                </div>
            </div>

            <ArchiveSearch updateSearch={updateSearch} />

            {currentVideos && <ArchiveVideo video={currentVideos} />}

            {currentVideos && searchVideos && (
                <Pagination
                    videosPerPage={videosPerPage}
                    totalVideos={searchVideos.length}
                    paginate={paginate}
                    funcNextPage={nextPage}
                    funcPrevPage={prevPage}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
}
