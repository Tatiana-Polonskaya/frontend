import React from 'react';
import './style.scss';
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import ThoroughSpeaker from './img/ThoroughSpeaker.svg';
import SerialChrysostom from './img/SerialChrysostom.svg';
import EloquentTalker from './img/EloquentTalker.svg';


const CN = cn("blockGeneralAnalytics");

type Props={
    N:number;
    rank:string;
}

export default function BlockGeneralAnalytics(props:Props) {
     let N = 9
    let degree:string="";
    let image: string = "";
    if(props.N >8){
        degree = "Говорун";
        image = EloquentTalker;
    }
    else if(props.N >6 ||props.N<=8){
        degree = "Златоуст";
        image= SerialChrysostom;
    }
    else if(props.N || props.N <=6){
        degree = "Оратор";
        image = ThoroughSpeaker
    }
    else if( props.N >2 || props.N<=4){
        degree = "Спикер";
    }
    else if(props.N>= 2){
        degree = "Выступающий";
    }
    else if(props.N <=1){
        degree = "В режиме ожидания ";
    }
    else if(props.N >-1){
        degree = "Неизвестный новичок";
    }

    return (
        <>
            <div className={CN()}>
                <div className={CN('text')}>
                    <div className={CN('rank')}>
                        Текущее звание
                    </div>
                    <div className={CN('degree')}>
                        Основательный {degree}
                    </div>
                    <div className={CN('previous')}>
                        Предыдущее: последовательный {degree}
                    </div>
                    <div className={'tagline'}>
                        Твои аргументы прочны как скала. Продолжай идти к своей цели!
                    </div>
                </div>
                <div className={CN('img')}>
                    <ReactSVG src={image}/>
                </div>
            </div>

        </>
    );
}

