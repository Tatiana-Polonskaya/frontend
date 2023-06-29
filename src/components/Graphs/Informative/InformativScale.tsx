import React from 'react';
import './Informative.css'
import {IScaleDataType} from "../../../models/graph/inteface/scale";
import Scale from "../Scale";

type Props = {
    values?: [],
    informative: number,
    parasite: number,
    sounds: number,
    without_confirmation: number
}

function InformativScale(props: Props) {
    let inf: IScaleDataType = ({
        item:[
            {
                title:"Слова-паразиты",
                value:props.parasite,
                color:"#410DAE",
            },
            {
                title:"Неречевые звуки",
                value:props.without_confirmation,
                color:"#FE5D74",
            },
            {
                title:"Пустые паузы",
                value:props.sounds,
                color:"#FFB800",
            },
            {
                title:"Информативная часть",
                value:props.informative,
                color:"#D4DFF4",
            },
        ]
    });
    return (
        <>
            <div className="inf">
                <Scale component={inf}/>
            </div>
        </>
    );
}
export default InformativScale;


