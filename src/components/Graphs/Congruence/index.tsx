import "./style.scss";
import { cn } from "@bem-react/classname";

import angrySmile from "./img/смайл злость.svg";
import happySmile from "./img/смайл радость.svg";
import neutralSmile from "./img/смайл нейтральность.svg";
import GraphColor from "../../../models/graph/_colors";
import { ChannelInfo } from "../../../models/graph/emotionality";
import ChannelCircle from "./ChannelCircle";

const CN = cn("congruence");

type Props = {
    diameter: ChannelInfo;
};

export default function Congruence({ diameter }: Props) {
    return (
        <div className={CN()}>
            <ChannelCircle
                title="Нейтрально"
                picture={neutralSmile}
                videoValue={diameter.video.neutral}
                audioValue={diameter.audio.neutral}
                textValue={diameter.text.neutral}
                color={GraphColor.GRAY}
            />
            <ChannelCircle
                title="Радость"
                picture={happySmile}
                videoValue={diameter.video.happiness}
                audioValue={diameter.audio.happiness}
                textValue={diameter.text.happiness}
                color={GraphColor.SUPERLIGHTGREEN}
            />
            <ChannelCircle
                title="Злость"
                picture={angrySmile}
                videoValue={diameter.video.anger}
                audioValue={diameter.audio.anger}
                textValue={diameter.text.anger}
                color={GraphColor.SUPERLIGHTRED}
            />
        </div>
    );
}
