import React from 'react';
import './style.css'
import {IScaleDataType} from "../../../models/graph/inteface/scale";

interface IComponentProps {
    component: IScaleDataType
}
export default function Scale(props: IComponentProps) {

    let items= props.component.item;

    const listItems = items.map((number,idx) =>
        <div key={idx} className="contentScale" style={{backgroundColor: number.color, width: (number.value.toString()+"%") }}>
            <div className="textScale" >
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

