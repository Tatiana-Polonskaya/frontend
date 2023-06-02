import BrickedGraph from "../-Base/Bricked";
import { InformativeDataItem } from "../../../models/graph/informative";
import convertInformativeData from "../../../@adapters/Graphs/informative";

type Props = {
    items: InformativeDataItem[];
};

export default function InformativeGraph({ items }: Props) {
    return (
        <BrickedGraph items={items.map((el) => convertInformativeData(el))} />
    );
}
