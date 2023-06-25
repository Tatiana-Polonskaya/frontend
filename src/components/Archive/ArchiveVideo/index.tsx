import { cn } from "@bem-react/classname";
import "./style.scss";
import VideoProgressPanel from "../../VideoProgressPanel";
import DescriptionArchiveVideo from "../DescriptionVideo";
import { IVideoFromBack } from "../../../models/video";
import { Fragment, useState } from "react";
import ReactPlayer from "react-player";

import More from "./icon/more.svg";
import { ReactSVG } from "react-svg";
import ArchivePopup from "../ArchivePopup";

type Props = {
    video?: IVideoFromBack | undefined;
};

export default function ArchiveVideo({ video }: Props) {
    const cnArchiveVideo = cn("archive-video");

    const [popupState, setPopupState] = useState("d-n");

    const changePopup = () => {
        popupState !== "d-n" ? setPopupState("d-n") : setPopupState("");
    };

    return (
        <div className={cnArchiveVideo()}>
            <div className={cnArchiveVideo("el")}>
                {/* <Fragment key={video!.id}>
                    <ReactPlayer url={`api/video/${video!.id}`} />
                </Fragment> */}
            </div>
            <DescriptionArchiveVideo
                title={"Название видео"}
                time={"3:56"}
                date={"02.04.2023"}
            />
            <div className={cnArchiveVideo("panel")}>
                <VideoProgressPanel
                    result={[10, 20, 30, 40, 50, 60]}
                    type={"small"}
                />
                <div className={cnArchiveVideo("panel-more")}>
                    <ReactSVG src={More} onClick={changePopup} />
                    <ArchivePopup state={popupState} />
                </div>
            </div>
        </div>
    );
}
