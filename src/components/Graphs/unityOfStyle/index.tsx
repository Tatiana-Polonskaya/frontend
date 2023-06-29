import React from 'react';
import './UnityOfStyl.css'
import Scale from "../Scale";
import {IScaleDataType} from "../../../models/graph/inteface/scale";
import {IPieChart} from "../../../models/graph/inteface/IPieChart";


type  Props={
    scientific: number,
    official: number,
    publicistic: number,
    colloquial: number,
    artistic: number
}
export default function UnityOfStylScale(props:Props) {

    let inf1:IPieChart = {
        scientific: props.scientific,
        official: props.official,
        publicistic: props.publicistic,
        colloquial: props.colloquial,
        artistic: props.artistic
    }
    let inf: IScaleDataType = ({
        item:[
            {
                title:"Публицистический",
                value:inf1.publicistic,
                color:"#2477F4",
            },
            {
                title:"Другие стили",
                value:(inf1.artistic+inf1.colloquial+inf1.scientific+inf1.official),
                color:"#D4DFF4",
            }
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

