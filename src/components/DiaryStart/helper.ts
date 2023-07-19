import { IStatisticJSON } from "../../models/diary";

export default function percentHelper(
    data: IStatisticJSON | undefined,
    val: string
) {
    if (data) {
        if (val === "total") {
            return data.total_result;
        } else if (val === "connectivity") {
            return data.connectedness;
        } else if (val === "argumentativeness") {
            return data.argumentativeness;
        } else if (val === "clarity") {
            return data.clarity;
        } else if (val === "dynamism") {
            return data.dynamism;
        } else if (val === "communicative") {
            return data.communicative;
        } else {
            return data.persuasiveness;
        }
    }
}
