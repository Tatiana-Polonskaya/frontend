import Frame1 from "../../components/Report/assets/Frame1.svg";
import Frame2 from "../../components/Report/assets/Frame2.svg";
import Frame3 from "../../components/Report/assets/Frame3.svg";
import Frame4 from "../../components/Report/assets/Frame4.svg";
import Frame5 from "../../components/Report/assets/Frame5.svg";

import GraphColor from "../../models/graph/_colors";

export interface ISectionRecomendation {
    connectivity: string[];
    argumentativeness: string[];
    clarity: string[];
    dynamism: string[];
    persuasiveness: string[];
    communicative: string[];
}

export const getTotalTitle = (value: string): string => {
    switch (value) {
        case "connectedness":
            return "связность";
        case "argumentativeness":
            return "аргументированность";
        case "clarity":
            return "ясность";
        case "dynamism":
            return "динамизм";
        case "persuasiveness":
            return "убедительность";
        case "communicative":
            return `соблюдение \n
			коммуникативной нормы`;
        default:
            return "";
    }
};

export const getTotalResult = (value: number): string[] => {
    if (value < 20) {
        return [GraphColor.SPURPLE, Frame1, "Ужасно"];
    } else if (value < 40) {
        return [GraphColor.ORANGE, Frame2, "Плохо"];
    } else if (value < 60) {
        return [GraphColor.SYELLOW, Frame3, "Средне"];
    } else if (value < 80) {
        return [GraphColor.SGREEN, Frame4, "Хорошо"];
    } else {
        return [GraphColor.SBLUE, Frame5, "Великолепно"];
    }
};

type totalItemDesc = {
    connectivityTotal: {
        value: number;
        params: {
            connectivity: number;
            informative: number;
            unityOfStyle: number;
        };
    };
    argumentativenessTotal: {
        value: number;
        params: {};
    };
    clarityTotal: {
        value: number;
        params: {
            clarity: number;
            eloquence: number;
            expressiveness: number;
        };
    };
    dynamismTotal: {
        value: number;
        params: {
            energy: number;
            nonMonotony: number;
            emotionality: number;
        };
    };
    persuasivenessTotal: {
        value: number;
        params: {
            confidence: number;
            emotionalArousal: number;
            congruence: number;
        };
    };
    communicativeTotal: {
        value: number;
        params: {};
    };
};

const convertTitleToRussian = (title: string) => {
    switch (title) {
        case "connectivityTotal":
            return "связность";
        case "argumentativenessTotal":
            return "аргументированность";
        case "clarityTotal":
            return "ясность";
        case "dynamismTotal":
            return "динамизм";
        case "persuasivenessTotal":
            return "убедительность";
        case "communicativeTotal":
            return `соблюдение \n
			коммуникативной нормы`;
        default:
            return "";
    }
};

export const getTotalDesc = (arrayValues: totalItemDesc) => {
    const MIN_RESULT = 80;
    let minValueArr = 100;
    let maxValueArr = 0;

    Object.entries(arrayValues).forEach(([key, obj]) => {
        minValueArr =
            obj.value < minValueArr && key !== "argumentativenessTotal"
                ? obj.value
                : minValueArr;
        maxValueArr = obj.value > maxValueArr ? obj.value : maxValueArr;
    });

    if (maxValueArr >= MIN_RESULT && minValueArr >= MIN_RESULT) {
        const minObject = Object.entries(arrayValues).filter(
            ([, obj]) => minValueArr === obj.value
        );
        const maxTitles = minObject.map((el) => convertTitleToRussian(el[0]));
        return `Не смотря на то, что Вы добились очень хороших показателей по основным критериям публичного выступления, в последующих репетициях следует обратить на его ${
            maxTitles.length > 1 ? maxTitles.join(", ") : maxTitles.at(0)
        }. Подробные рекомендации даны в соответствующих разделах выше. `;
    } else if (maxValueArr >= MIN_RESULT && minValueArr < MIN_RESULT) {
        const maxObject = Object.entries(arrayValues).filter(
            ([, obj]) => maxValueArr === obj.value
        );
        const minObjects = Object.entries(arrayValues).filter(
            ([, obj]) => obj.value < MIN_RESULT
        );

        const minTitles = minObjects.map((el) => convertTitleToRussian(el[0]));
        const maxTitles = maxObject.map((el) => convertTitleToRussian(el[0]));

        return `Не смотря на то, что Вы добились хороших результатов по таким критериям публичного выступления, как ${
            maxTitles.length > 1 ? maxTitles.join(", ") : maxTitles.at(0)
        }, в последующих репетициях следует обратить внимание на ${
            minTitles.length > 1 ? minTitles.join(", ") : minTitles.at(0)
        }. Подробные рекомендации даны в соответствующих разделах выше.`;
    } else {
        const minObjects = Object.entries(arrayValues).filter(
            ([, obj]) => obj.value < MIN_RESULT
        );
        const minTitles = minObjects.map((el) => convertTitleToRussian(el[0]));

        return `В последующих репетициях следует обратить внимание на ${
            minTitles.length > 1 ? minTitles.join(", ") : minTitles.at(0)
        }. Подробные рекомендации даны в соответствующих разделах выше.`;
    }
};
