import { cn } from "@bem-react/classname";

import { IVideoFromBack } from "../../../models/video";
import VideoPlayer, { getPrettyDataTime } from "../../VideoPlayer";

import NoPhoto from "../../ProfilePreview/assets/no-photo.png";
import "./style.scss";

type Props = {
    item: IVideoFromBack;
    clickFunction: Function;
};

export default function VideoItem(props: Props) {
    const cnVideoItem = cn("video-item");

    return (
        <div className={cnVideoItem()}>
            <div
                className={cnVideoItem("video-block")}
                onClick={() => props.clickFunction()}
            >
                <VideoPlayer url={`/api/video/${props.item.id}`} controls={false}/>
            </div>

            <div className={cnVideoItem("author-block")}>
                <div className={cnVideoItem("author-block-title")}>
                    { !props.item.channel_title && (<div className={cnVideoItem("logo")}>
                        <img className={cnVideoItem("logo-pic")} src={NoPhoto} alt=''/>
                    </div>)}
                    
                    <p>{props.item.channel_title ? props.item.channel_title: "Источник" }</p>
                </div>
                <p>{getPrettyDataTime(props.item.upload_date)}</p>
            </div>

            <p className={cnVideoItem("title")}>{props.item.title}</p>
        </div>
    );
}
