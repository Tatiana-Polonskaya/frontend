import "./style.scss";
import ConfidenceLineGraph from "../../../../../Graphs/ConfidenceLine";
import { ConfidenceDataItem } from "../../../../../../models/graph/confidence";

type Props = {
    data: ConfidenceDataItem[];
    endTime: number;
};

export default function MainConfidence(props: Props) {
    return (
        <>
            <ConfidenceLineGraph
                items={props.data}
                startTime={0}
                endTime={props.endTime}
            />
        </>
    );
}
