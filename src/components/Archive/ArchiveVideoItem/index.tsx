import { cn } from "@bem-react/classname";
import { Fragment, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import ReactPlayer from "react-player";
import { IVideoFromBack } from "../../../models/video";
import "./style.scss";
import VideoProgressPanel from "../../VideoProgressPanel";
import DescriptionArchiveVideo from "../DescriptionVideo";
import ArchivePopup from "../ArchivePopup";

import More from "./icon/more.svg";
import Participation from "./icon/archive-participation.svg";
import Tick from "./icon/archive-tick.svg";

import { convertTime, convertDate } from "../helpers";
import {
    useDeleteVideoByIdMutation,
    useGetVideoByIdQuery,
    useGetVideoInfoByIdQuery,
} from "../../../store/api/userVideo";
import { useGetTotalByIdQuery } from "../../../store/api/report";

type Props = {
    el: IVideoFromBack;
    ind: number;
};

export default function ArchiveVideoItem({ el, ind }: Props) {
    const cnArchiveVideo = cn("archive-video");

    let [openPopup, setOpenPopup] = useState<number[]>([]);

    let [deleteArchiveVideo, setdeleteArchiveVideo] = useState<number>();

    let [tickedVideo, setTickedVideo] = useState<number[]>([]);

    const changePopup = (ind: number) => {
        let copy: number[] = Object.assign([], openPopup);
        !openPopup.includes(ind)
            ? copy.push(ind)
            : copy.splice(copy.indexOf(ind), 1);

        setOpenPopup([...copy]);
    };

    const GetDeleteArchiveVideo = (id: number) => {
        setdeleteArchiveVideo(id);
        // console.log(video[id]);
        // console.log(video[id].id);
        // const { data } = useGetVideoInfoByIdQuery(video.id);
        // console.log(data);
        // const [deleteVideo, results] = useDeleteVideoByIdMutation();

        // useEffect(() => {
        //     if (results && results.data) {
        //         console.log(results);
        //     }
        // }, [results]);
    };

    // поменять, от обратного
    const changeTickVideo = (ind: number) => {
        let copy: number[] = Object.assign([], openPopup);
        !tickedVideo.includes(ind)
            ? copy.push(ind)
            : copy.splice(copy.indexOf(ind), 1);

        setTickedVideo([...copy]);
        console.log(tickedVideo);
    };

    const totalData = useGetTotalByIdQuery(el.id).data?.data?.values;
    const result = [
        totalData!.connectedness,
        totalData!.argumentativeness,
        totalData!.clarity,
        totalData!.dynamism,
        totalData!.persuasiveness,
        totalData!.communicative,
    ];
    return (
        <div className={cnArchiveVideo()}>
            <div className={cnArchiveVideo("el")}>
                <ReactSVG
                    src={!tickedVideo.includes(ind) ? Tick : Participation}
                />
                <Fragment key={el.id}>
                    <ReactPlayer
                        url={`api/video/${el.id}`}
                        width={"100%"}
                        height={"100%"}
                    />
                </Fragment>
            </div>
            <DescriptionArchiveVideo
                id={el.id}
                title={`${el.title}`}
                time={convertTime(el.duration)}
                date={convertDate(el.upload_date)}
            />
            <div className={cnArchiveVideo("panel")}>
                <VideoProgressPanel result={result} type={"small"} />
                <div className={cnArchiveVideo("panel-more")}>
                    <ReactSVG src={More} onClick={() => changePopup(ind)} />
                    <ArchivePopup
                        id={ind}
                        getDeleteArchiveVideo={GetDeleteArchiveVideo}
                        changeTickVideo={changeTickVideo}
                        state={openPopup.includes(ind) ? "" : "d-n"}
                    />
                </div>
            </div>
        </div>
    );
}
// function seUpdateVideoInfoByIdMutation(arg0: string): { data: any } {
//     throw new Error("Function not implemented.");
// }
