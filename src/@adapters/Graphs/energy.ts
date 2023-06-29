import { EnergyDataItem, EnergyType } from "../../models/graph/energy";

export default function convertEnergyData(
    items: EnergyDataItem[],
    param: EnergyType | null = null
) {
    const filterList = param ? [param] : Object.values(EnergyType);

    return items.map((el) =>
        Object.fromEntries(filterList.map((type) => [type, el[type]]))
    );
}
