import GraphColor from "../../../models/graph/_colors";

import LineGraph from "../-Base/Line";
import { createXDescriptionFromData } from "../-Base/helpers";

import convertExpressivenessData from "../../../@adapters/Graphs/expressiveness";
import {
    ExpressivenessDataItem,
    ExpressivenessType,
} from "../../../models/graph/expressiveness";

type Props = {
    data: ExpressivenessDataItem[];
    param: ExpressivenessType | ExpressivenessType[] | null;
};

export default function ExpressivenessGraph({ data, param = null }: Props) {
    const data2 = convertExpressivenessData(data, param);
    return (
        <LineGraph
            items={data2}
            descriptionX={createXDescriptionFromData(data)}
            range={{ min: 0, max: 1 }}
            descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            colors={{
                [ExpressivenessType.NEUTRAL]: GraphColor.DARKGRAY,
                [ExpressivenessType.HAPPINESS]: GraphColor.GREEN,
                [ExpressivenessType.ANGER]: GraphColor.RED,
            }}
        />
    );
}
