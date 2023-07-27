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
    param: NonMonotonyType | null;
    average: number;
    value: number;
};

export default function NonMonotonyGraph({
    data,
    param = null,
    average,
    value,
}: Props) {
    const data2 = convertMonotonyData(data, param);
    console.log("param", param);
    console.log("value", value);
    console.log("data2", data2);
    console.log("average", average);

    const dependece = dependenceMonotonyData(param, average);
    console.log("dependece", dependece);
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
