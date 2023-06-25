import { cn } from "@bem-react/classname";
import { Fragment, useState } from "react";
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
import { useDeleteVideoByIdMutation } from "../../../store/api/userVideo";

type Props = {
    video: IVideoFromBack[];
};

export default function ArchiveVideo({ video }: Props) {
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
        console.log(video[id].id);
        // useDeleteVideoByIdMutation(`${video[id].id}`);
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

    return video.length !== 0 ? (
        <>
            {video.map((el, ind) => (
                <div key={ind} className={cnArchiveVideo()}>
                    <div className={cnArchiveVideo("el")}>
                        <ReactSVG
                            src={
                                !tickedVideo.includes(ind)
                                    ? Tick
                                    : Participation
                            }
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
                        title={`${el.title}`}
                        time={convertTime(el.duration)}
                        date={convertDate(el.upload_date)}
                    />
                    <div className={cnArchiveVideo("panel")}>
                        <VideoProgressPanel
                            result={[10, 20, 30, 40, 50, 60]}
                            type={"small"}
                        />
                        <div className={cnArchiveVideo("panel-more")}>
                            <ReactSVG
                                src={More}
                                onClick={() => changePopup(ind)}
                            />
                            <ArchivePopup
                                id={ind}
                                getDeleteArchiveVideo={GetDeleteArchiveVideo}
                                changeTickVideo={changeTickVideo}
                                state={openPopup.includes(ind) ? "" : "d-n"}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    ) : (
        <>{"Упс, что-то пошло не по плану"}</>
    );
}
// function seUpdateVideoInfoByIdMutation(arg0: string): { data: any } {
//     throw new Error("Function not implemented.");
// }
