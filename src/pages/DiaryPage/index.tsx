import { Fragment } from "react";
import MainLayout from "../../layouts/MainLayout";
import { IVideoFromBack } from "../../models/video";

import {
    useGetVideoByIdQuery,
    useGetVideoByUserQuery,
} from "../../store/api/userVideo";
import ReactPlayer from "react-player";
import VideoProgressPanel from "../../components/VideoProgressPanel";

export default function DiaryPage() {
    const { data } = useGetVideoByUserQuery();
    const userVideos = data?.data?.videos as IVideoFromBack[];
    // console.log(userVideos);

    return (
        <MainLayout>
            {userVideos &&
                userVideos.map((el) => (
                    <Fragment key={el.id}>
                        <ReactPlayer url={`api/video/${el.id}`} />
                    </Fragment>
                ))}
            <VideoProgressPanel
                result={[10, 20, 30, 40, 50, 60]}
                type={"small"}
            />
        </MainLayout>
    );
}
