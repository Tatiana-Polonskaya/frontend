import { ReactSVG } from "react-svg";
import textIcon from "./assets/textIcon.svg";
import videoIcon from "./assets/videoIcon.svg";
import volumeIcon from "./assets/volumeIcon.svg";
import { cn } from "@bem-react/classname";

import "./style.scss";

type ChannelCircleProps = {
    title: string;
    picture: string;
    videoValue: number;
    audioValue: number;
    textValue: number;
    color: string;
};

function convertSharesIntoDiameter(fraction: number): number {
    const allowanceForDiameter = 20;
    const minValueDiameter = 20;
    const maxValueDiameter = 80;

    fraction = fraction * 100 + allowanceForDiameter;
    if (fraction < minValueDiameter) return minValueDiameter;
    else if (fraction > maxValueDiameter) return maxValueDiameter;
    else return fraction;
}

const CN = cn("ChannelCircle");

export default function ChannelCircle(props: ChannelCircleProps) {
    const valuesOfChannels = [
        props.videoValue,
        props.audioValue,
        props.textValue,
    ];
    const picturesForChannels = [videoIcon, volumeIcon, textIcon];

    return (
        <div className={CN("block")}>
            <div className={CN("header")}>
                <ReactSVG className={CN("header-image")} src={props.picture} />
                <div className={CN("header-title")}>{props.title}</div>
            </div>
            <div className={CN("circle")}>
                {valuesOfChannels.map((el, i) => (
                    <div
                        key={i}
                        className={CN("video")}
                        style={{
                            width: convertSharesIntoDiameter(el) + "px",
                            height: convertSharesIntoDiameter(el) + "px",
                            background: props.color,
                        }}
                    >
                        <ReactSVG src={picturesForChannels[i]} />
                    </div>
                ))}
            </div>
        </div>
    );
}
