import BrickedGraph from "../-Base/Bricked";
import { InformativeDataItem } from "../../../models/graph/informative";
import convertInformativeData from "../../../@adapters/Graphs/informative";
import InformativeText from "./InformativeText";

type Props = {
    items: InformativeDataItem[];
};

export default function InformativeGraph({ items }: Props) {
    console.log("items", items)
    return (
        <>
            <InformativeText/>
            <BrickedGraph items={items.map((el) => convertInformativeData(el))} />
        </>

    );
}
