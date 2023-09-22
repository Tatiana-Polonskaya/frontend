import { cn } from "@bem-react/classname";

import "./style.scss";
import { IVideoFromBack } from "../../../models/video";
import VideoPlayer from "../../VideoPlayer";

type Props = {
    onClick: Function;
} & IVideoFromBack;

const cnCarouselItem = cn("carouse-item");

export default function CarouselItem(props: Props) {
    return (
        <div className={cnCarouselItem()} onClick={() => props.onClick()}>
            <div
                className={cnCarouselItem("img-block")}
                // style={{ backgroundImage: `url(${props.item.img})` }}
            >
                <VideoPlayer
                    url={`/api/video/${props.id}`}
                    controls={false}
                    className={cnCarouselItem("video-block")}
                />
                <div className={cnCarouselItem("button")}>
                    <img src="/images/button-play.png" alt="play" />
                </div>
            </div>
            <p>{props.title}</p>
        </div>
    );
}
