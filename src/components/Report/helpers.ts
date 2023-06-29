import Frame1 from "../../components/Report/assets/Frame1.svg";
import Frame2 from "../../components/Report/assets/Frame2.svg";
import Frame3 from "../../components/Report/assets/Frame3.svg";
import Frame4 from "../../components/Report/assets/Frame4.svg";
import Frame5 from "../../components/Report/assets/Frame5.svg";

import GraphColor from "../../models/graph/_colors";

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
        return [GraphColor.SORANGE, Frame2, "Плохо"];
    } else if (value < 60) {
        return [GraphColor.SYELLOW, Frame3, "Средне"];
    } else if (value < 80) {
        return [GraphColor.SGREEN, Frame4, "Хорошо"];
    } else {
        return [GraphColor.SBLUE, Frame5, "Великолепно"];
    }
};
