import BrickedGraph from "../-Base/Bricked";
import { InformativeDataItem } from "../../../models/graph/informative";
import convertInformativeData from "../../../@adapters/Graphs/informative";
import Icons from "../../Menu/icons";
import InformativeText from "./InformativeText";

type Props = {
    items: InformativeDataItem[];
};

export default function InformativeGraph({ items }: Props) {
    return (
        <>
            <InformativeText/>
            <BrickedGraph items={items.map((el) => convertInformativeData(el))} />
        </>

    );
}
