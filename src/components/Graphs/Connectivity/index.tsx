import BrickedGraph from "../-Base/Bricked";
import { ConnectivityDataItem } from "../../../models/graph/connectivity";
import convertConnectivityData from "../../../@adapters/Graphs/connectivity";

type Props = {
    items: ConnectivityDataItem[];
};

export default function ConnectivityGraph({ items }: Props) {
    return (
        <BrickedGraph items={items.map((el) => convertConnectivityData(el))} />
    );
}
