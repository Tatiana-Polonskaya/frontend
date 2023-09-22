import GraphColor from "../../../models/graph/_colors";

import LineGraph from "../-Base/Line";
import { createXDescriptionFromData } from "../-Base/helpers";
import {
    NonMonotonyDataItem,
    NonMonotonyType,
} from "../../../models/graph/monotony";
import {
    convertMonotonyData,
    dependenceMonotonyData,
} from "../../../@adapters/Graphs/monotony";

type Props = {
    data: NonMonotonyDataItem[];
    param: NonMonotonyType;
    average: number;
    value: number;
};

export default function NonMonotonyGraph({ data, param, average }: Props) {
    const data2 = convertMonotonyData(data, param);

    const dependece = dependenceMonotonyData(average, param);
    return (
        <LineGraph
            average={dependece.average}
            withMedian={dependece.withMedian}
            items={data2}
            descriptionX={createXDescriptionFromData(data)}
            range={{ min: dependece.min, max: dependece.max }}
            descriptionY={dependece.descriptionY}
            colors={{
                [NonMonotonyType.RATE]: GraphColor.BLUE,
                [NonMonotonyType.VOLUME]: GraphColor.RED,
                [NonMonotonyType.TONE]: GraphColor.ORANGE,
            }}
        />
    );
}
