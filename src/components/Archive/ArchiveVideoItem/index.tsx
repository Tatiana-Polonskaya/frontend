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
import ArchiveVideoError from "../ArcviveVideoError";
import { useDeleteVideoByIdMutation } from "../../../store/api/userVideo";
import { useGetTotalByIdTestQuery } from "../../../store/api/reportTest";
import { useGetVideoByIdQuery } from "../../../store/api/apiWithDifAnswers";
// import VideoLoadProgress from "../../VideoLoadProgress";

type Props = {
    el: IVideoFromBack;
    ind: number;
    handleClick?: Function;
    visible?: boolean;
};

export default function ArchiveVideoItem({
    el,
    ind,
    handleClick,
    visible = true,
}: Props) {
    // export default function ArchiveVideoItem({ el, ind }: Props) {
    const cnArchiveVideo = cn("archive-video");

    const [openPopup, setOpenPopup] = useState<number[]>([]);

    const [tickedVideo, setTickedVideo] = useState<number[]>([]);

    const changePopup = (id: number) => {
        const copy: number[] = Object.assign([], openPopup);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !openPopup.includes(id)
            ? copy.push(id)
            : copy.splice(copy.indexOf(id), 1);

        setOpenPopup([...copy]);
    };

    // поменять, от обратного
    const changeTickVideo = (id: number) => {
        const copy: number[] = Object.assign([], openPopup);
        // let copy: number[] = [...openPopup];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !tickedVideo.includes(id)
            ? copy.push(id)
            : copy.splice(copy.indexOf(id), 1);

        setTickedVideo([...copy]);
    };

    const totalData = useGetTotalByIdTestQuery(el.id).data?.data?.values;
    const [result, setResult] = useState<number[]>([]);

    useEffect(() => {
        if (totalData) {
            setResult([
                totalData!.connectedness,
                totalData!.argumentativeness,
                totalData!.clarity,
                totalData!.dynamism,
                totalData!.persuasiveness,
                totalData!.communicative,
            ]);
        }
    }, [totalData]);

    const [, deleteResponse] = useDeleteVideoByIdMutation();
    const { isSuccess, isError } = deleteResponse;

    useEffect(() => {
        if (isSuccess) console.log("video was deleted", deleteResponse);
    }, [isSuccess]);

    useEffect(() => {
        if (isError) alert("Something was wrong!");
    }, [isError]);

    const isAllow = visible;

    // getting video by id

    const videoFromBack = useGetVideoByIdQuery(el.id);
    const [videoURL, setVideoURL] = useState<string>();

    useEffect(() => {
        if (videoFromBack.data && videoFromBack.isSuccess) {
            setVideoURL(videoFromBack.data);
        }
    }, [videoFromBack]);

    return (
        <div className={cnArchiveVideo()}>
            <div className={cnArchiveVideo("el")}>
                <ReactSVG
                    className={cnArchiveVideo("tick")}
                    src={!tickedVideo.includes(ind) ? Tick : Participation}
                />
                <Fragment key={el.id}>
                    {videoURL && (
                        <ReactPlayer
                            url={videoURL}
                            width={"100%"}
                            height={"100%"}
                        />
                    )}
                </Fragment>
            </div>
            <DescriptionArchiveVideo
                id={el.id}
                title={`${el.title}`}
                time={convertTime(el.duration)}
                date={convertDate(el.upload_date)}
                isAllow={isAllow}
            />
            <div className={cnArchiveVideo("panel")}>
                {!visible && <ArchiveVideoError />}
                {visible && (
                    <VideoProgressPanel result={result} type={"small"} />
                )}
                <div className={cnArchiveVideo("panel-more")}>
                    <ReactSVG src={More} onClick={() => changePopup(ind)} />
                    <ArchivePopup
                        ind={ind}
                        id={el.id}
                        changeTickVideo={changeTickVideo}
                        handleClick={handleClick!}
                        state={openPopup.includes(ind) ? "" : "d-n"}
                    />
                </div>
            </div>
        </div>
    );
}
