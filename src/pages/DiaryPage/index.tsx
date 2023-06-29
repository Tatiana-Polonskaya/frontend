// import { Fragment } from "react";
// import ReactPlayer from "react-player";
import MainLayout from "../../layouts/MainLayout";
import { IVideoFromBack } from "../../models/video";

import {
    // useGetVideoByIdQuery,
    useGetVideoByUserQuery,
} from "../../store/api/userVideo";
import ArchiveVideo from "../../components/Archive/ArchiveVideo";
import ArchiveSearch from "../../components/Archive/ArchiveSearch";
import { useEffect, useState } from "react";

import stats from "./../../plugs/stats.json";
import StatsGraph from "../../components/Graphs/Stats";
import ConfidenceGraph from "../../components/Graphs/Confidence";
import VideoBlock from "../../components/VideoBlock";
import Padination from "../../components/Pagination";

export default function DiaryPage() {
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
        <MainLayout>
            <StatsGraph data={stats.data.values} />
            <ArchiveSearch updateSearch={updateSearch} />
            {userVideos && <ArchiveVideo video={result} />}
            {/* {userVideos &&
                currentVideos.map((el, ind) => <ArchiveVideo video={result} />)} */}
            <Padination
                videosPerPage={videosPerPage}
                totalVideos={videos.length}
                paginate={paginate}
                funcNextPage={nextPage}
                funcPrevPage={prevPage}
                currentPage={currentPage}
            />
        </MainLayout>
    );
}
