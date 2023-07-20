import React, {useState} from 'react';
import {ReactSVG} from "react-svg";
import LampCharge from "../icons/lamp-charge.svg";
import {cn} from "@bem-react/classname";

import "./style.scss";

type Props={
    Nitemp:number,
    Tnerech:number,
    Tdroz:number
    Tob:number
    Nparaz:number,
    Nvist:number,
    Nkpedl:number,
    Npredl:number,
    Nzpredl:number,
    Napredl:number,
    Pekspr:number,
}
const cnRecomendation = cn("recomendation");
function str(Tob:number,Tdroz:number,Nitemp:number, Tnerech:number, Nparaz:number, Nvist:number, Nkpedl:number, Npredl:number, Nzpredl:number, Napredl:number, Pekspr:number){
    let str=""
    if (Nitemp>0){
        str+="Наилучший темп речи в публичном выступлении – средний. Если Вы не успеваете высказать мысль, не ускоряйтесь - скорее всего эта мысль останется не воспринятой слушателями. "
    }
    if ((Tnerech+Tdroz)/Tob >= 0.3){
        str+="Неясное и нечеткое произношение контуров слов указывает на недостаток критического отношения к самому себе, уступчивость, неуверенность. Поработайте над собой - это позволит сделать Вашу речь чётче. "
    }
    if (0.5< (Nparaz/Nvist) && (Nparaz/Nvist) < 0.1){
        str+="Для того, чтобы избавиться от слов-паразитов, попробуйте найти для них синонимы из литературного стиля речи (например, “блин” можно заменить более конкретной фразой “Как же я разочарован!”). "
    }
    if (Nparaz/Nvist >= 0.1){
        str+="Убирайте слова-паразиты из своей речи по одному за раз. Для этого заменяйте их на литературные синонимы (например, вместо “походу” используйте “по-видимому”) или делайте большой вдох, когда чувствуете соблазн вставить не нужное словечко. "
    }
    if (Nkpedl/Npredl < 0.2){
        str+="Необходимо использовать более простые синтаксические конструкции в тексте Вашего выступления. Из каждого длинного предложения сделайте несколько коротких. Известно, что лучше воспринимаются предложения, не превышающие 13-15 слов. "
    }
    if (0.2<=(Nkpedl/Npredl)&&(Nkpedl/Npredl) < 0.5){
        str+="Выступление необходимо строить с использованием более простых и коротких предложений, используя хорошо воспринимающиеся на слух слова и словосочетания. "
    }
    if (Nzpredl/Npredl <0.4){
        str+="Иногда бывает необходимо употребить в выступлении научные и абстрактные слова, но их не должно быть много и нужно тщательно продумать, как это правильно сделать. Соответствующее слово нужно понятно объяснить – дать определение простыми словами, назвать синонимы, близкие по значению слова и выражения, привести пример его употребления, объяснить происхождение, повторить несколько раз в разных сочетаниях. "
    }
    if (0.4 <= (Nzpredl/Npredl) && (Nzpredl/Npredl) <0.7){
        str+="Понимание речи на слух - довольно трудная задача, и её нужно максимально упростить. Старайтесь чаще объяснять сложные слова и понятия через простые и знакомые слушателю слова. "
    }
    if (Pekspr < 0.5){
        str+="Изучайте речь других выдающихся ораторов, чтобы понять, как они используют эмоционально окрашенную лексику. "
    }
    else{
        str = "Регулярно расширяйте свой словарный запас, поскольку это поможет Вам в выборе более точных и выразительных слов для передачи своих мыслей и эмоций "
    }

    return str;
}
function RecommendConn(props:Props) {
    const [active, setActive] = useState("");

    const unfold = () => {
        if (active) {
            setActive("");
        } else {
            setActive("active");
        }
    };
    return (
        <div className={cnRecomendation()}>
            <div className={cnRecomendation("header")}>
                <ReactSVG
                    className={cnRecomendation("icon")}
                    src={LampCharge}
                />
                <div className={cnRecomendation("title")}>Рекомендации</div>
                <div onClick={unfold} className={cnRecomendation("link")}>
                    Развернуть
                </div>
            </div>
            <div className={cnRecomendation("content")}>
                <p className={`${active}`}>
                    {str(props.Tob,
                        props.Tdroz,
                        props.Nitemp,
                        props.Tnerech,
                        props.Nparaz,
                        props.Nvist,
                        props.Nkpedl,
                        props.Npredl,
                        props.Nzpredl,
                        props.Napredl,
                        props.Pekspr,)}
                </p>
            </div>
        </div>
    )
}

export default RecommendConn;