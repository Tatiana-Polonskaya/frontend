import { Fragment } from "react";
import MainLayout from "../../layouts/MainLayout";
import { IVideoFromBack } from "../../models/video";

import { useGetVideoByIdQuery, useGetVideoByUserQuery } from "../../store/api/userVideo";
import ReactPlayer from 'react-player';

const idVideo = "95eddb64-6656-4cd8-8c88-6fc680d8fecd";

export default function DiaryPage() {
    
    const { data } = useGetVideoByUserQuery();
    const userVideos = data?.data?.videos as IVideoFromBack[];
    console.log(userVideos);
    const videoData  = useGetVideoByIdQuery("feb81d20-2bb0-4622-b41a-3c6d50c6b3f8");

    return (
        <MainLayout>
            <ReactPlayer url='https://www.youtube.com/watch?v=RKozwlUeCiQ'/>
            <ReactPlayer url={`http://dev.speech-up.online/api/video/${idVideo}.mp4`} />
            {userVideos &&
                userVideos.map((el) => (
                    <Fragment key={el.id}>
                        <ReactPlayer url={`api/video/${el.id}.mp4`}/>
                    </Fragment>
                ))}
        </MainLayout>
    );
}
