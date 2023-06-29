import {
    ExpressivenessDataItem,
    ExpressivenessType,
} from "../../models/graph/expressiveness";

export default function convertExpressivenessData(
    items: ExpressivenessDataItem[],
    param: ExpressivenessType | ExpressivenessType[] | null
) {
    const filterList = Array.isArray(param)
        ? param
        : param !== null
        ? [param]
        : Object.values(ExpressivenessType);

    return items.map((el) =>
        Object.fromEntries(filterList.map((type) => [type, el[type]]))
    );
}
