import { cn } from "@bem-react/classname";

import LineGraph from "../-Base/Line";
import GraphColor from "../../../models/graph/_colors";

import {
    // createXDescriptionFromData,
    createXDescriptionFromDataConfidence,
} from "../-Base/helpers";
import { ConfidenceDataItem } from "../../../models/graph/confidence";

import "./style.scss";

const CN = cn("confidence-graph");

type Props = { data: ConfidenceDataItem[]; average: number };

const X = "value";
export default function ConfidenceGraph({ data, average }: Props) {
    return (
        <LineGraph
            // items={data.map((x) => ({ [X]: x.value }))}
            items={data.map((x) => ({ [X]: x.confidence }))}
            colors={{ [X]: GraphColor.BLUE }}
            descriptionX={createXDescriptionFromDataConfidence(data)}
            descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            range={{ min: 0, max: 1 }}
            average={average}
            background={
                <div className={CN("bg")}>
                    <div className={CN("bg", { high: true })} />
                    <div className={CN("bg", { medium: true })} />
                    <div className={CN("bg", { low: true })} />
                </div>
            }
            tooltip={true}
        />
    );
}
