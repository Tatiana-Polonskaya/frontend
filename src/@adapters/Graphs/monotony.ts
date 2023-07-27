import {
    NonMonotonyDataItem,
    NonMonotonyType,
} from "../../models/graph/monotony";

export function convertMonotonyData(
    items: NonMonotonyDataItem[],
    param: NonMonotonyType | null = null
) {
    const filterList = param ? [param] : Object.values(NonMonotonyType);

    return items.map((el) =>
        Object.fromEntries(filterList.map((type) => [type, el[type]]))
    );
}

export function dependenceMonotonyData(
    param: NonMonotonyType | null = null,
    average: number
): {
    withMedian: boolean;
    min: number;
    max: number;
    descriptionY: number[];
    average: number;
} {
    if (param === NonMonotonyType.RATE) {
        return {
            withMedian: true,
            min: 0,
            max: 250,
            descriptionY: [0, 42, 83, 167, 208, 250],
            average: 100 - average,
        };
    } else if (param === NonMonotonyType.VOLUME) {
        return {
            withMedian: true,
            min: 0,
            max: 120,
            descriptionY: [0, 30, 60, 90, 120],
            average: 100 - average,
        };
    } else if (param === NonMonotonyType.TONE) {
        return {
            withMedian: false,
            min: -1,
            max: 1,
            descriptionY: [-1, -0.5, 0, 0.5, 1],
            average: 100 - average,
        };
    } else {
        return {
            withMedian: false,
            min: 0,
            max: 1,
            descriptionY: [0, 0.2, 0.4, 0.6, 0.8, 1],
            average: 100 - average,
        };
    }
}
