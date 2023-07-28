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
import { useGetTotalByIdQuery } from "../../../store/api/report";
import ArchiveVideoError from "../ArcviveVideoError";
import { useDeleteVideoByIdMutation } from "../../../store/api/userVideo";
import { useGetTotalByIdTestQuery } from "../../../store/api/reportTest";
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

    let [openPopup, setOpenPopup] = useState<number[]>([]);

    let [tickedVideo, setTickedVideo] = useState<number[]>([]);

    const changePopup = (ind: number) => {
        let copy: number[] = Object.assign([], openPopup);
        !openPopup.includes(ind)
            ? copy.push(ind)
            : copy.splice(copy.indexOf(ind), 1);

        setOpenPopup([...copy]);
    };

    // поменять, от обратного
    const changeTickVideo = (ind: number) => {
        let copy: number[] = Object.assign([], openPopup);
        // let copy: number[] = [...openPopup];
        !tickedVideo.includes(ind)
            ? copy.push(ind)
            : copy.splice(copy.indexOf(ind), 1);

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

    const [deleteRequest, deleteResponse] = useDeleteVideoByIdMutation();
    const { isLoading, isSuccess, isError } = deleteResponse;

    useEffect(() => {
        if (isSuccess) console.log("video was deleted", deleteResponse);
    }, [isSuccess]);

    useEffect(() => {
        if (isError) alert("Something was wrong!");
    }, [isError]);

    const func = async (id: string) => await deleteRequest(id);

    const isAllow = visible;
    return (
        <div className={cnArchiveVideo()}>
            <div className={cnArchiveVideo("el")}>
                <ReactSVG
                    className={cnArchiveVideo("tick")}
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
