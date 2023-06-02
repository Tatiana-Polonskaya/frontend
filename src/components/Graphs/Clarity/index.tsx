import BrickedGraph from "../-Base/Bricked";

import { ClarityDataItem } from "../../../models/graph/clarity";
import convertClarityData from "../../../@adapters/Graphs/clarity";

type Props = { data: ClarityDataItem[] };

export default function ClarityGraph({ data }: Props) {
    return <BrickedGraph items={convertClarityData(data)} />;
}
