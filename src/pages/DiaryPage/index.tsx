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

    // useEffect(() => {
    //     setCurrentUserVideo(result);
    // }, searchVideo);

    return (
        <MainLayout>
            <ArchiveSearch updateSearch={updateSearch} />

            {userVideos && <ArchiveVideo video={result} />}
        </MainLayout>
    );
}
