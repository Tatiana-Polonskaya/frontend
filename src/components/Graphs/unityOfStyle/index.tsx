import "./UnityOfStyl.css";
import Scale from "../Scale";
import { IScaleDataType } from "../../../models/graph/inteface/scale";
import GraphColor from "../../../models/graph/_colors";

type Props = {
    scientific: number;
    official: number;
    publicistic: number;
    colloquial: number;
    artistic: number;
};

const convertUnityOfStyleInTitle = (title: string) => {
    switch (title) {
        case "scientific":
            return "Научный";
        case "official":
            return "Официально-деловой";
        case "publicistic":
            return "Публицистический";
        case "colloquial":
            return "Разговорный";
        case "artistic":
            return "Художественный";
        default:
            return "";
    }
};

export default function UnityOfStylScale(props: Props) {
    const MAX_STYLE = 0.5;
    const SECOND_MAX_STYLE = 0.2;
    let maxTitle: string[] = [];
    let maxSecondTitles: string[] = [];

    Object.entries(props).forEach((el) => {
        if (el[1] > MAX_STYLE) maxTitle.push(el[0]);
        else if (el[1] > SECOND_MAX_STYLE) maxSecondTitles.push(el[0]);
    });

    const res: IScaleDataType =
        maxTitle.length > 0
            ? {
                  item: [
                      {
                          title: convertUnityOfStyleInTitle(maxTitle[0]),
                          value: props[maxTitle[0] as keyof Props],
                          color: GraphColor.BLUE,
                      },
                      {
                          title: "Другие стили",
                          value: 1 - props[maxTitle[0] as keyof Props],
                          color: GraphColor.GRAY,
                      },
                  ],
              }
            : {
                  item: [
                      {
                          title: "Отсутствует единство стиля",
                          value: 1,
                          color: GraphColor.GRAY,
                      },
                  ],
              };

    return (
        <>
            <div className="inf">
                <Scale component={res} />
            </div>
        </>
    );
}
