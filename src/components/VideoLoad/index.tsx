import { cn } from "@bem-react/classname";
import { Fragment } from "react";
import ReactPlayer from "react-player";
import { IVideoStatus } from "../../models/video";
// import "./style.scss";
import DescriptionArchiveVideo from "../Archive/DescriptionVideo";

import { convertTime, convertDate } from "../Archive/helpers";
import VideoLoadProgress from "../VideoLoadProgress";

type Props = {
    el: IVideoStatus;
    ind: number;
    handleClick?: Function;
    visible?: boolean;
    percent: string;
    isAllow: boolean;
};

export default function VideoLoad({ el, visible, percent, isAllow }: Props) {
    const cnArchiveVideo = cn("archive-video");
    return (
        <div className={cnArchiveVideo()}>
            <div className={cnArchiveVideo("el")}>
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
                {/* сюда передавать процент прогресса */}
                {!visible && (
                    <VideoLoadProgress
                        citation={
                            percent < "70"
                                ? "Идёт анализ видео"
                                : "Еще чуть-чуть"
                        }
                        advice={el.quote}
                        percent={percent}
                    />
                )}
            </div>
        </div>
    );
}
