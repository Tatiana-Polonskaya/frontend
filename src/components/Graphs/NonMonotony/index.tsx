import GraphColor from "../../../models/graph/_colors";

import LineGraph from "../-Base/Line";
import { createXDescriptionFromData } from "../-Base/helpers";
import {
    NonMonotonyDataItem,
    NonMonotonyType,
} from "../../../models/graph/monotony";
import convertMonotonyData from "../../../@adapters/Graphs/monotony";

type Props = {
    data: NonMonotonyDataItem[];
    param: NonMonotonyType | null;
    average: number;
};

export default function NonMonotonyGraph({
    data,
    param = null,
    average,
}: Props) {
    const data2 = convertMonotonyData(data, param);
    return (
        <LineGraph
            average={100 - average}
            items={data2}
            descriptionX={createXDescriptionFromData(data)}
            range={{ min: 0, max: 1 }}
            descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            colors={{
                [NonMonotonyType.RATE]: GraphColor.BLUE,
                [NonMonotonyType.VOLUME]: GraphColor.RED,
                [NonMonotonyType.TONE]: GraphColor.ORANGE,
            }}
        />
    );
}
