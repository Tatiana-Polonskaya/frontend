import React from 'react';
import './styleText.css'

type TinfEloquence={
    "data": {
        "values": {
            "parasitic_words": number,
            "short_sentences":number,
            "short_words": number,
            "active_words": number,
            "parasitic_words_list": {
                "слово": number,
                "ещеслово": number,
                "ещеслололово": number,
                "что-то": number
                [index: string]: number;
            }
        }
    },
    "error"?: null,
    "success"?: boolean
};
function paintWords( data: TinfEloquence){
    let a=[];
    let i =0;
    for (let key in data.data.values.parasitic_words_list) {
        if (data.data.values.parasitic_words_list == null){
            return <div className='blocWords'> {("слов-паразитов не найдено")} </div>
        }
        a[i] = <div className='blocWords' key={key}> {(key)} <div className="strings">{(data.data.values.parasitic_words_list[key])}</div></div>
        i++;
    }
    return a;
}
function EloquenceText(props: TinfEloquence) {
    let infEloquence:TinfEloquence = props;
    let countWords =  0
    for (let key in infEloquence.data.values.parasitic_words_list) {
        countWords += infEloquence.data.values.parasitic_words_list[key];
    }

        return (
        <>
            <div className='EloquenceAllText'>
                <div className='Eloquencetext1'>
                    <b className="textInfTitle"> Красноречивость </b> - способность выступающего выражать свои мысли максимально точно и ярко.
                </div>
                <span className='Eloquencetext2'>
                    Она достигается использованием:
                </span>
                <div className='ul'>
                    <div className='li'>
                        <b className="textInfTitle1">простых коротких предложений </b> (не более 13 слов);
                    </div>
                    <div className='li'>
                        <b className="textInfTitle1">коротких слов, знакомых слушателю </b> (например, “начать” вместо “инициировать”, “двигаться” вместо “перемещаться” и т.п);
                    </div>
                    <div className='li'>
                        <b className="textInfTitle1">активных слов, требующих действий </b> (например, “написать”,  “рассмотреть”,  “разрешить” и т.п.).
                    </div>
                </div>
                <div className='Eloquencetext3'>
                    Снижает красноречивость использование бессмысленных слов-паразитов.
                </div>
            </div>

            <div className='EloquenceTextBloc'>
                <div className='EloquenceTextTitle'>
                    Слова-паразиты <div className='countWords'> {countWords}</div>
                </div>
                <div className='EloquenceTexts'>
                    <b className="textInfTitle"> Слова-паразиты</b> - лингвистическое явление, которое выражается вупотреблении лишних и бессмысленных слов в речи.
                </div>
                <div className='EloquenceTextWords'>
                    {paintWords(infEloquence)}
                </div>
            </div>
        </>
    );
}

export default EloquenceText;