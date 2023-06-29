import { Fragment, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { IVideoFromBack } from "../../models/video";

import {
    useGetVideoByIdQuery,
    useGetVideoByUserQuery,
} from "../../store/api/userVideo";
import ReactPlayer from "react-player";

import "./style.scss";
import stats from "./../../plugs/stats.json";
import StatsGraph from "../Graphs/Stats";
import ArchiveSearch from "../Archive/ArchiveSearch";
import ArchiveVideo from "../Archive/ArchiveVideo";
import Pagination from "../Pagination";
import RollUp from "../RollUp";

import statisticIcon from "./icons/statistic.svg";
import videoListIcon from "./icons/videolist.svg";
import { cn } from "@bem-react/classname";
import AimBlock from "../AimBlock";

export default function DiaryStart() {
    const cnDiaryStart = cn("DiaryStart");
    const { data } = useGetVideoByUserQuery();
    const userVideos = data?.data?.videos as IVideoFromBack[];

    const [currentUserVideo, setCurrentUserVideo] = useState(userVideos);

    const [searchVideo, setSearchVideo] = useState("");
    const updateSearch = (value: string) => {
        setSearchVideo(value);
    };

    let result = currentUserVideo;
    if (userVideos && searchVideo !== "") {
        // сделать частичное совпадение динамичным
        result = userVideos.filter(
            (el) => el.title.indexOf(searchVideo) !== -1
        );
    }
    //useState for paggination
    const [videos, setVideos] = useState<IVideoFromBack[]>([]);
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(6);

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

    return (
        <div>
            <div className={cnDiaryStart("text-h1")}>Достижения</div>
            <div className={cnDiaryStart("banner")}>
                {/* -------------------------------- Баннер -------------------------------- */}
            </div>

            <div className={cnDiaryStart("aims")}>
                <AimBlock />
            </div>

            <RollUp title="Видео на анализе" icon={videoListIcon}>
                <div>Нет видео на анализе</div>
            </RollUp>
            <RollUp title="Статистика за неделю" icon={statisticIcon}>
                <StatsGraph data={stats.data.values} />
            </RollUp>

            <div>
                <div className={cnDiaryStart("text-h1")}>
                    Архив проверок{" "}
                    {userVideos && (
                        <span className={cnDiaryStart("text-gray")}>
                            {userVideos.length}
                        </span>
                    )}
                </div>
            </div>

            <ArchiveSearch updateSearch={updateSearch} />

            {userVideos && <ArchiveVideo video={result} />}
            {/* {userVideos &&
                currentVideos.map((el, ind) => <ArchiveVideo video={result} />)} */}
            {videos && (
                <Pagination
                    videosPerPage={videosPerPage}
                    totalVideos={videos.length}
                    paginate={paginate}
                    funcNextPage={nextPage}
                    funcPrevPage={prevPage}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
}
