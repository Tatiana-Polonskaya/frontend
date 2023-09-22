import "./styleText.css";
import { EloquenceDataItem } from "../../../models/graph/eloquence";

function paintWords(data: EloquenceDataItem) {
    const a = [];
    let i = 0;
    for (const key in data.parasitic_words_list) {
        if (data.parasitic_words_list == null) {
            return (
                <div className="blocWords"> {"слов-паразитов не найдено"} </div>
            );
        }
        a[i] = (
            <div className="blocWords" key={key}>
                {" "}
                {key}{" "}
                <div className="strings">{data.parasitic_words_list[key]}</div>
            </div>
        );
        i++;
    }
    return a;
}

type Props = {
    data: EloquenceDataItem;
};

function EloquenceText(props: Props) {
    const infEloquence: EloquenceDataItem = props.data;
    let countWords = 0;
    for (const key in infEloquence.parasitic_words_list) {
        countWords += infEloquence.parasitic_words_list[key];
    }

    return (
        <>
            <div className="EloquenceAllText">
                <div className="Eloquencetext1">
                    <b className="textInfTitle"> Красноречивость </b> -
                    достигается использованием:
                </div>
                <div className="ul">
                    <div className="li">
                        <b className="textInfTitle1">
                            простых коротких предложений{" "}
                        </b>{" "}
                        (не более 13 слов);
                    </div>
                    <div className="li">
                        <b className="textInfTitle1">
                            коротких слов, знакомых слушателю{" "}
                        </b>{" "}
                        (например, “начать” вместо “инициировать”, “двигаться”
                        вместо “перемещаться” и т.п);
                    </div>
                    <div className="li">
                        <b className="textInfTitle1">
                            активных слов, требующих действий{" "}
                        </b>{" "}
                        (например, “написать”, “рассмотреть”, “разрешить” и
                        т.п.).
                    </div>
                </div>
                <div className="Eloquencetext3">
                    Снижает красноречивость использование бессмысленных
                    слов-паразитов.
                </div>
            </div>

            <div className="EloquenceTextBloc">
                <div className="EloquenceTextTitle">
                    Слова-паразиты{" "}
                    <div className="countWords"> {countWords}</div>
                </div>
                <div className="EloquenceTexts">
                    <b className="textInfTitle"> Слова-паразиты</b> -
                    лингвистическое явление, которое выражается в употреблении
                    лишних и бессмысленных слов в речи.
                </div>
                <div className="EloquenceTextWords">
                    {paintWords(infEloquence)}
                </div>
            </div>
        </>
    );
}

export default EloquenceText;
