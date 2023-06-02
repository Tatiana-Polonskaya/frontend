import {
    NonMonotonyDataItem,
    NonMonotonyType,
} from "../../models/graph/monotony";

export default function convertMonotonyData(
    items: NonMonotonyDataItem[],
    param: NonMonotonyType | null = null
) {
    const filterList = param ? [param] : Object.values(NonMonotonyType);

    return items.map((el) =>
        Object.fromEntries(filterList.map((type) => [type, el[type]]))
    );
}
