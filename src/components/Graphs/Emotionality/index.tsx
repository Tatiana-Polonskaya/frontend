import { createXDescriptionFromData } from "../-Base/helpers";

import GraphColor from "../../../models/graph/_colors";
import LineGraph from "../-Base/Line";
import {
    EmotionalityChannel,
    EmotionalityDataItem,
    EmotionalityItem,
} from "../../../models/graph/emotionality";
import convertEmotionalityData from "../../../@adapters/Graphs/emotionality";

type Props = {
    data: EmotionalityDataItem[];
    channel: EmotionalityChannel;
    emotions: EmotionalityItem[];
};

export default function EmotionalityGraph({ data, channel, emotions }: Props) {
    const channelsData = convertEmotionalityData(data, channel, emotions);

    return (
        <LineGraph
            items={channelsData}
            descriptionX={createXDescriptionFromData(data)}
            range={{ min: 0, max: 1 }}
            descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            colors={{
                [EmotionalityItem.ANGER]: GraphColor.RED,
                [EmotionalityItem.HAPPINESS]: GraphColor.GREEN,
                [EmotionalityItem.NEUTRAL]: GraphColor.DARKGRAY,
            }}
        />
    );
}
