import GraphColor from "../../../models/graph/_colors";

import LineGraph from "../-Base/Line";
import { createXDescriptionFromData } from "../-Base/helpers";
import { EnergyDataItem, EnergyType } from "../../../models/graph/energy";
import convertEnergyData from "../../../@adapters/Graphs/energy";

type Props = {
    data: EnergyDataItem[];
    param: EnergyType | null;
    average: number;
};

export default function EnergyGraph({ data, param = null, average }: Props) {
    const data2 = convertEnergyData(data, param);
    return (
        <LineGraph
            average={100 - average}
            items={data2}
            descriptionX={createXDescriptionFromData(data)}
            range={{ min: 0, max: 1 }}
            descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            colors={{
                [EnergyType.ENERGY]: GraphColor.BLUE,
            }}
        />
    );
}
