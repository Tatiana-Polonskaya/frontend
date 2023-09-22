/* eslint-disable @typescript-eslint/no-unused-vars */
import { TotalDataItem, TotalType } from "../../models/graph/total";

export default function convertTotalData(
    values: TotalDataItem,
    param: TotalType | null = null
) {
    return Object.values(TotalType);
}
