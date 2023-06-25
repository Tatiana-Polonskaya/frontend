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

    let [popupState, setPopupState] = useState("d-n");

    const changePopup = () => {
        popupState === "d-n" ? setPopupState("") : setPopupState("d-n");
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
                            <ReactSVG src={More} onClick={changePopup} />
                            <ArchivePopup state={popupState} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    ) : (
        <>{"Упс, что-то пошло не по плану"}</>
    );
    // <>
    //     {video.map((el, ind) => (
    //         <div key={ind} className={cnArchiveVideo()}>
    //             <div className={cnArchiveVideo("el")}>
    //                 <Fragment key={el.id}>
    //                     <ReactPlayer
    //                         url={`api/video/${el.id}`}
    //                         width={"100%"}
    //                         height={"100%"}
    //                     />
    //                 </Fragment>
    //             </div>
    //             <DescriptionArchiveVideo
    //                 title={`${el.title}`}
    //                 time={convertTime(el.duration)}
    //                 date={convertDate(el.upload_date)}
    //             />
    //             <div className={cnArchiveVideo("panel")}>
    //                 <VideoProgressPanel
    //                     result={[10, 20, 30, 40, 50, 60]}
    //                     type={"small"}
    //                 />
    //                 <div className={cnArchiveVideo("panel-more")}>
    //                     <ReactSVG src={More} onClick={changePopup} />
    //                     <ArchivePopup state={popupState} />
    //                 </div>
    //             </div>
    //         </div>
    //     ))}
    // </>
}
// function seUpdateVideoInfoByIdMutation(arg0: string): { data: any } {
//     throw new Error("Function not implemented.");
// }
