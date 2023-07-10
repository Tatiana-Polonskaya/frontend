import React from 'react';
import './UnityOfStyl.css'
import Scale from "../Scale";
import {IScaleDataType} from "../../../models/graph/inteface/scale";

type  Props={
    scientific: number,
    official: number,
    publicistic: number,
    colloquial: number,
    artistic: number
}

function recordingInf(max:number, strName:string, sumAnuther:number){
     let inf: IScaleDataType = ({
        item:[
            {
                title:strName,
                value:max,
                color:"#2477F4",
            },
            {
                title:"Другие стили",
                value:sumAnuther,
                color:"#D4DFF4",
            }
        ]
    });
    return inf;
}
let inf1:IScaleDataType;
export default function UnityOfStylScale(props:Props) {
    if(props.colloquial> props.artistic &&
        props.colloquial>props.publicistic &&
        props.colloquial> props.official &&
        props.colloquial>props.scientific){
        let sum = props.artistic+props.publicistic+props.official+props.scientific;
        inf1 = recordingInf(props.colloquial,"Разговорный",sum);
    }else if(props.scientific > props.colloquial &&
        props.scientific>props.publicistic &&
        props.scientific> props.official &&
        props.scientific>props.artistic){
        let sum = props.colloquial+props.publicistic+props.official+props.artistic;
        inf1 = recordingInf(props.scientific,"Научный",sum);
    } else if(props.publicistic> props.colloquial &&
        props.publicistic>props.artistic &&
        props.publicistic> props.official &&
        props.publicistic>props.scientific){
        let sum = props.colloquial+props.artistic+props.official+props.scientific;
        inf1 = recordingInf(props.publicistic,"Публицистический",sum);
    }else if(props.official> props.colloquial &&
        props.official>props.publicistic &&
        props.official> props.artistic &&
        props.official>props.scientific){
        let sum = props.colloquial+props.publicistic+props.artistic+props.scientific;
        inf1 = recordingInf(props.official,"Официально - деловой",sum);
    }else if(props.artistic> props.colloquial &&
        props.artistic>props.publicistic &&
        props.artistic> props.official &&
        props.artistic>props.scientific){
        let sum = props.colloquial+props.publicistic+props.official+props.scientific;
        inf1 = recordingInf(props.artistic,"Художественный",sum);
    }

    return (
        <>
            <div className="inf">
                <Scale component={inf1}/>
            </div>

        </>
    );
}

