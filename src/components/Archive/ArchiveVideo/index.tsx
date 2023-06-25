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

import { convertTime, convertDate } from "../helpers";

type Props = {
    video: IVideoFromBack[];
};

export default function ArchiveVideo({ video }: Props) {
    const cnArchiveVideo = cn("archive-video");

    let [openPopup, setOpenPopup] = useState<number[]>([]);

    const changePopup = (ind: number) => {
        let copy: number[] = Object.assign([], openPopup);
        !openPopup.includes(ind)
            ? copy.push(ind)
            : copy.splice(copy.indexOf(ind), 1);

        setOpenPopup([...copy]);
    };

    return video.length !== 0 ? (
        <>
            {video.map((el, ind) => (
                <div key={ind} className={cnArchiveVideo()}>
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
