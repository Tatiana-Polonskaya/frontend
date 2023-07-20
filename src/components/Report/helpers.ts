import { useState } from "react";
import Frame1 from "../../components/Report/assets/Frame1.svg";
import Frame2 from "../../components/Report/assets/Frame2.svg";
import Frame3 from "../../components/Report/assets/Frame3.svg";
import Frame4 from "../../components/Report/assets/Frame4.svg";
import Frame5 from "../../components/Report/assets/Frame5.svg";

import GraphColor from "../../models/graph/_colors";
import { ChannelInfo } from "../../models/graph/emotionality";
import Congruence from "../Graphs/Congruence";

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
        return [GraphColor.SORANGE, Frame2, "Плохо"];
    } else if (value < 60) {
        return [GraphColor.SYELLOW, Frame3, "Средне"];
    } else if (value < 80) {
        return [GraphColor.SGREEN, Frame4, "Хорошо"];
    } else {
        return [GraphColor.SBLUE, Frame5, "Великолепно"];
    }
};

export const statmentHelper = (value: number): string => {
    const statmentHelpArr: number[] = [1, 21, 31, 41, 51, 61, 71, 81, 91];
    if (
        statmentHelpArr.includes(value % 100) ||
        statmentHelpArr.includes(value % 10)
    ) {
        return `Потеря логической связи в ${value} высказывании.`;
    } else if (value === 0) {
        return "Все высказывания логически связаны.";
    } else {
        return `Потеря логической связи в ${value} высказываниях.`;
    }
};

export const judgmentHelper = (value: number): string => {
    if ([2, 3, 4].includes(value % 100) || [2, 3, 4].includes(value % 10)) {
        return `Зафиксирована неуверенность в суждениях ${value} раза.`;
    } else if (value === 0) {
        return "Случаев неуверенности не выявлено.";
    } else {
        return `Зафиксирована неуверенность в суждениях ${value} раз.`;
    }
};

export const connectednessRecomendation = (value: number): string => {
    return `Зафиксирована неуверенность в суждениях ${value} раз.`;
};
export const argumentativenessRecomendation = (
    Pcon?: number,
    Porig?: number,
    Pcit?: number,
    Pbor?: number
): string => {
    const Ka = (Pcon! * Porig!) / 100 + Pcit! - Pbor!;
    if (Pcit! > 50 && Ka > 50) {
        return `Может возникнуть впечатление, что Вы пытаетесь давить на аудиторию. Вспомните поговорку: кто много доказывает, тот ничего не доказывает. Оптимальное число доказательств, приводимых в поддержку выступления - три.`;
    } else if (Pcit! < 50 && Ka > 50) {
        return `Аргументы надо приводить в системе - следует чётко продумать, с каких аргументов начать, а какими закончить. Аргументы должны быть убедительными, то есть сильными, с которыми все соглашаются.`;
    } else if (Pcit! > 50 && Ka < 50) {
        return Math.round(Math.random()) === 0
            ? `Может возникнуть впечатление, что Вы пытаетесь давить на аудиторию. Вспомните поговорку: кто много доказывает, тот ничего не доказывает. Оптимальное число доказательств, приводимых в поддержку выступления - три.`
            : `Рекомендуется всегда начинать выступление с самого сильного аргумента. Этим вы покажете, что предмет презентации действительно необходим вашей аудитории. Затем можно дать два-три аргумента, преподнося их по силе нарастания важности. Эти аргументы должны быть тщательно отобраны с учетом интересов публики. `;
    } else {
        return Math.round(Math.random()) === 0
            ? `Аргументы надо приводить в системе - следует чётко продумать, с каких аргументов начать, а какими закончить. Аргументы должны быть убедительными, то есть сильными, с которыми все соглашаются.`
            : `Рекомендуется всегда начинать выступление с самого сильного аргумента. Этим вы покажете, что предмет презентации действительно необходим вашей аудитории. Затем можно дать два-три аргумента, преподнося их по силе нарастания важности. Эти аргументы должны быть тщательно отобраны с учетом интересов публики. `;
    }
};
export const clarityRecomendation = (value: number): string => {
    return `Зафиксирована неуверенность в суждениях ${value} раз.`;
};
export const dynamismRecomendation = (value: number): string => {
    return `Зафиксирована неуверенность в суждениях ${value} раз.`;
};
export const persuasivenessRecomendation = (
    audioAnger?: number,
    audioHappiness?: number,
    audioNeutral?: number,
    textAnger?: number,
    textHappiness?: number,
    textNeutral?: number,
    videoAnger?: number,
    videoHappiness?: number,
    videoNeutral?: number,
    Pcer?: number,
    Puncer?: number,
    Kt?: number,
    Koa?: number,
    Ka?: number
): string => {
    const recomendation: string[] = [];

    const Pcong =
        1 -
        0.8 *
            Math.max(
                audioAnger!,
                audioHappiness!,
                audioNeutral!,
                textAnger!,
                textHappiness!,
                textNeutral!,
                videoAnger!,
                videoHappiness!,
                videoNeutral!
            );

    if (Pcong < 0.8) {
        recomendation.push(
            "Сниженный уровень конгруэнтности может быть обусловлен страхом публичного выступления, проблемами с осознанием переживаемых чувств, эмоций и ощущений. Начните со страхов."
        );
    }

    if (Pcer! / 100 < 0.5) {
        recomendation.push(
            "Всегда важно, выступая, иметь «резервные знания» - материала у вас должно быть минимум на треть больше того, который, по вашим расчетам, необходим для выступления. Это придаст Вам уверенности."
        );
    }
    if (Pcer! / 100 >= 0.5 && Pcer! / 100 < 0.7) {
        recomendation.push(
            "При подготовке к выступлению с избытком подбирайте материал, это позволит увереннее обращаться с ним."
        );
    }
    if (Puncer! > 2) {
        recomendation.push(
            "Заранее высказывайте себе отношение к содержанию того, о чём Вы будете говорить, то есть высказывайте свою оценку той или иной мысли, с которой Вы выйдете к слушателям."
        );
    }

    if (Kt! < 0.8) {
        recomendation.push(
            "Если рефлексия - не цель Вашего выступления, будьте активнее. Возможно,следует поработать над собой, чтобы добиться эмоциональность стабильности."
        );
    }
    if (Koa! < 0.8) {
        recomendation.push(
            "Старайтесь строить свою речь на основе двусоставных предложений, в котором есть подлежащее и простое сказуемое."
        );
    }
    if (Ka! < 0.4) {
        recomendation.push(
            "Агрессия может вызвать неприятие всего сказанного. Слушатели не виноваты в том, что Вы боитесь. Поработайте над своими страхами."
        );
    }
    if ((Kt! + Koa! + Ka!) / 2.6 < 0.8) {
        recomendation.push(
            "Чтобы снизить эмоциональное возбуждение, в процессе подготовки к выступлению проделайте произвольные дыхательные упражнения с длительным выдохом. "
        );
    }
    if (
        Pcong >= 0.8 &&
        Pcer! / 100 >= 0.7 &&
        Puncer! <= 2 &&
        Kt! >= 0.8 &&
        Koa! >= 0.8 &&
        Ka! >= 0.4 &&
        (Kt! + Koa! + Ka!) / 2.6 >= 0.8
    ) {
        recomendation.push(
            "В случае, если Вы ставите себе целью убедить людей в чем-либо, либо Вам надо побудить людей в аудитории к определенным действиям, то Вам лучше всего сконцентрироваться на подробном анализе аудитории (чтобы понять, какие именно факторы повлияют на позицию аудитории), на содержании и структуре презентации с продумыванием аргументов и примеров (чтобы речь была логичной и убедительной) и на тщательной подготовке наглядных пособий (это усилит Ваше влияние на людей)"
        );
    }
    return recomendation.join("\n");
};
export const communicativeRecomendation = (
    Ppar?: number,
    Pki?: number,
    Pagr?: number
): string => {
    const recomendation: string[] = [];

    if (Ppar! / 100 > 0.2) {
        recomendation.push(
            "Вы очень злоупотребляете словами, не несущими никакой информационной нагрузки. Выгрузите текст Вашего выступления и отрепетируйте его еще раз, не употребляя слов-паразитов. Прослушайте, что у Вас получилось. Результат Вас приятно удивит."
        );
    }
    if (Pki! / 100 > 0.4) {
        recomendation.push(
            "Большая часть когнитивных искажения в общении со слушателями возникает из-за того, что мы просто не можем представить себя на их месте. Работайте над собой - развивайте эмоциональный интеллект."
        );
    }
    if (Pagr! / 100 > 0.2) {
        recomendation.push(
            "Часто нарушения коммуникативной нормы появляются из-за негативных эмоций, таких как страх и тревога. Постарайтесь избегать уменьшительно-ласкательных и пренебрежительных выражений, используйте более профессиональный язык."
        );
    }
    if (Ppar! / 100 <= 0.2 && Pki! / 100 <= 0.4 && Pagr! / 100 <= 0.2) {
        recomendation.push(
            "Помните, нарушение коммуникативных норм обычно не остается незамеченным. В зависимости от того, насколько грубым было это нарушение, наказания выражаются в отказе адресата от коммуникации вообще, в прерывании общения, в недостижении цели общения."
        );
    }
    return recomendation.join("\n");
};

type totalItemDesc = {
    connectivity: number;
    argumentativeness: number;
    clarity: number;
    dynamism: number;
    persuasiveness: number;
    communicative: number;
};

const convertTitleToRussian = (title: string) => {
    switch (title) {
        case "connectivity":
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

export const getTotalDesc = (arrayValues: totalItemDesc) => {
    const MIN_RESULT = 80;

    let tempArr = Object.entries(arrayValues).map(([key, value]) => {
        return value;
    });

    const maxArr = Math.max.apply(Math, tempArr);
    const minArr = Math.min.apply(Math, tempArr);

    if (maxArr >= MIN_RESULT && minArr >= MIN_RESULT) {
        let minObject = Object.entries(arrayValues).filter(
            ([key, value]) => minArr === value
        );
        let minTitels = minObject.map((el) => convertTitleToRussian(el[0]));

        return `Не смотря на то, что Вы добились очень хороших показателей по основным критериям публичного выступления, в последующих репетициях следует обратить на его ${
            minTitels.length > 1 ? minTitels.join(", ") : minTitels.at(0)
        }. Подробные рекомендации даны в соответствующих разделах выше. `;
    } else if (maxArr >= MIN_RESULT && minArr < MIN_RESULT) {
        let maxObject = Object.entries(arrayValues).filter(
            ([key, value]) => maxArr === value
        );
        let minObjects = Object.entries(arrayValues).filter(
            ([key, value]) => value < MIN_RESULT
        );
        let minTitels = minObjects.map((el) => convertTitleToRussian(el[0]));
        let maxTitels = maxObject.map((el) => convertTitleToRussian(el[0]));
        return `Не смотря на то, что Вы добились хороших результатов по таким критериям публичного выступления, как ${
            maxTitels.length > 1 ? maxTitels.join(", ") : maxTitels.at(0)
        }, в последующих репетициях следует обратить внимание на ${
            minTitels.length > 1 ? minTitels.join(", ") : minTitels.at(0)
        }`;
    } else {
        let minObjects = Object.entries(arrayValues).filter(
            ([key, value]) => value < MIN_RESULT
        );
        let minTitels = minObjects.map((el) => {
            return convertTitleToRussian(el[0]);
        });

        return `В последующих репетициях следует обратить внимание на ${
            minTitels.length > 1 ? minTitels.join(", ") : minTitels.at(0)
        }. Подробные рекомендации даны в соответствующих разделах выше.`;
    }
};
