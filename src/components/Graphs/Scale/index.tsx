import React from 'react';
import './style.css'
import {IScaleDataType} from "../../../models/graph/inteface/scale";

interface IComponentProps {
    component: IScaleDataType
}

function checkSize(n:number){
    let size = "";
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
        <div key={idx} className="contentScale" style={{backgroundColor: number.color, width: (number.value.toString()+"%") }}>
            <div className="textScale" style={{fontSize: checkSize(number.value)}}>
                {number.title}
            </div>
        </div>
    );
    return (
        <div className="containerScale">
            {listItems}
        </div>
    );
}

