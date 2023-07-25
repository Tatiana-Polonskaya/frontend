import React from 'react';
import './style.css'
import {ReactSVG} from "react-svg";
import flaw from './img/недостаток.svg'
import medium from './img/среднее.svg'
import surplus from './img/излишне.svg'


const  textForFlawTitle:string = 'Низкий уровень эмоционального возбуждения';
const textForFlaw:string = 'Ваше выступление бесцветно и не интересно';
const textForMediumTitle:string = 'Оптимальный уровень эмоционального возбуждения';
const textForMedium :string = 'Позволит наиболее успешно реализовать замысел выступления';
const textForSurplusTitle:string = 'Излишнее эмоциональное возбуждение';
const textForSurplus:string = 'Снижается способность контролировать результат выступления.';
function check(data:number){
    if(data<= 0.4){
        return <div className='allEmotionalArousal'>
            {paint(flaw,"imkEmotionalArousal", textForFlaw, textForFlawTitle)}
            {paint(medium,"imkEmotionalArousal1")}
            {paint(surplus,"imkEmotionalArousal1")}
        </div>

    }
    if(data<= 0.8){
        return <div className='allEmotionalArousal'>
            {paint(flaw,"imkEmotionalArousal1")}
            {paint(medium,"imkEmotionalArousal", textForMedium, textForMediumTitle)}
            {paint(surplus,"imkEmotionalArousal1")}
        </div>
    }
    if (data > 0.8){
        return <div className='allEmotionalArousal'>
            {paint(flaw,"imkEmotionalArousal1")}
            {paint(medium,"imkEmotionalArousal1")}
            {paint(surplus,"imkEmotionalArousal", textForSurplus,textForSurplusTitle)}
        </div>

    }
}
function paint (img:string, classN: string, text?: string, textTitle?:string){
    return <div className='blockEmotionalArousal'>
        <ReactSVG src={img} className={classN}/>
        <div className='textEmotionalArousal'> {textTitle} </div>
        <div className='tEmotionalArousal'>{text}</div>
    </div>
}

type Props={
    emotional_arousal: number;
}


export default function EmotionalArousal(props : Props) {
    return (
        <>
            {check(props.emotional_arousal)}
        </>
    );
}

