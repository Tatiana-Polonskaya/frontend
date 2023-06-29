import { Fragment } from "react";
import MainLayout from "../../layouts/MainLayout";
import { IVideoFromBack } from "../../models/video";

import {
    useGetVideoByIdQuery,
    useGetVideoByUserQuery,
} from "../../store/api/userVideo";
import ReactPlayer from "react-player";

import "./style.scss";

export default function DiaryStart() {
    const { data } = useGetVideoByUserQuery();
    const userVideos = data?.data?.videos as IVideoFromBack[];
    console.log(userVideos);

    return (
        <div>
            {userVideos &&
                userVideos.map((el) => (
                    <Fragment key={el.id}>
                        <ReactPlayer url={`api/video/${el.id}`} />
                    </Fragment>
                ))}
        </div>
    );
}
