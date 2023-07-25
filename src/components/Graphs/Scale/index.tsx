import React from 'react';
import './style.scss'
import {IScaleDataType} from "../../../models/graph/inteface/scale";
import {cn} from "@bem-react/classname";


const CN = cn("Scale");
interface IComponentProps {
    component: IScaleDataType
}

function checkSize(n:number){
    let size
    if (n<= 15){
        size = "0px"
    }
    else {
        size = "18px";
    }
return size;
}

export default function Scale(props: IComponentProps) {

    let items= props.component.item;

    const listItems = items.map((number,idx) =>
        <div key={idx} className={CN("content")} style={{backgroundColor: number.color, width: (number.value.toString()+"%") }}>
            <div className={CN("text")}  style={{fontSize: checkSize(number.value)}}>
                {number.title}
            </div>
        </div>
    );
    return (
        <div className={CN()}>
            {listItems}
        </div>
    );
}

