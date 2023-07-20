import React, {useState} from 'react';
import {ReactSVG} from "react-svg";
import LampCharge from "../icons/lamp-charge.svg";
import {cn} from "@bem-react/classname";

import "./style.scss";

type Props={
    Nprotiv:number,
    Tparaz:number,
    Tnerech:number,
    Tpauza:number,
    Tob: number,
    Pnauch:number,
    Pofic:number,
    Ppabl:number,
    Prazgovor:number,
    Phud:number
}
const cnRecomendation = cn("recomendation");
function str(Nprotiv:number, Tparaz:number,Tnerech:number,Tpauza:number,Tob: number,Pnauch:number,Pofic:number, Ppabl:number,Prazgovor:number,Phud:number){
    let str=""
    let not=0;
    if(Nprotiv>2){
        str += Math.round(Math.random()) === 0
            ? "Используйте фразы-связки, такие как \"следовательно\", \"из-за этого\", \"в результате\",\"следует из этого\", \"относительно этого\", \"в таком случае\" и т. д., чтобы лучше связывать свои мысли. "
            : "Обращайте внимание на логическую последовательность мыслей, чтобы убедиться, что каждое следующее высказывание продолжает и развивает тему, начатую ранее в речи. "
    }else{
        ++not
    }
    if (Tparaz>Tob * 0.05 ){
        str += "Появление в речи слов-паразитов чаще всего происходит при нечеткой формулировке мыслей либо при потере нити повествования. Если Вы вдруг забыли необходимое слово, то лучше просто глубоко вдохнуть и мысленно постараться взять себя в руки. "
    }else{
        ++not
    }
    if (Tnerech>(0.1*Tob)){
        str += "Богатство содержания Вашей речи напрямую зависит от её информативной насыщенности. Однако, не всё, что Вы говорите, содержит в себе ценную информацию. Постарайтесь сократить число произносимых неречевых звуков. "
    }else{
        ++not
    }
    if (Tpauza>(0.1*Tob)){
        str += "Следует избегать больших пауз - они раздражают аудиторию, особенно хорошо подготовленную. "
    }else{
        ++not
    }
    if (Pnauch<=0.5 &&
        Pofic<=0.5 &&
        Ppabl<=0.5&&
        Prazgovor<=0.5&&
        Phud<=0.5){
        str += "Изучите правила и рекомендации по употреблению слов в разных стилях речи. Попрактикуйтесь в использовании лексических средств согласно их стилевой принадлежности. "
    }else if(Pnauch<0.5 ||
        Pofic<0.5 ||
        Ppabl<0.5||
        Prazgovor<0.5||
        Phud<0.5 &&
        Pnauch<0.2 ||
        Pofic<0.2 ||
        Ppabl<0.2||
        Prazgovor<0.2||
        Phud<0.2){
        str += "Старайтесь подбирать слова, которые наиболее соответствуют цели Вашего выступления и подходят выбранному стилю речи. "
    }else{
        ++not
    }
    if(not === 5 ){
        str = "Регулярное чтение позволит обогатить лексические знания и начать внимательно анализировать свои мысли и структурировать высказывания таким образом, чтобы они логически связывались между собой. "
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
                    {str(props.Nprotiv,
                        props.Tparaz,
                        props.Tnerech,
                        props.Tpauza,
                        props.Tob,
                        props.Pnauch,
                        props.Pofic,
                        props.Ppabl,
                        props.Prazgovor,
                        props.Phud)}
                </p>
            </div>
        </div>
    )
}

export default RecommendConn;