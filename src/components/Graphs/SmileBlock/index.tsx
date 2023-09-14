import React from 'react';
import { ReactSVG } from 'react-svg'
import './style.scss'
import {ISimelDescription} from "../../../models/graph/inteface/ISimelDescription";
import {ISimel} from "../../../models/graph/inteface/ISimel";

interface IComponentProps {
    component: ISimel
}

function paint (item:ISimelDescription, img:string ){
    let procent
    if (item.procent > 9 && item.procent<100){
        procent = item.procent.toString()[0]
    }else if (item.procent >= 100){
        procent = "11"
    }else if (item.procent === 0){
        procent = "12"
    }
    else {
        procent = "1"
    }
    return <div className='contentPaint'>
        <div >
            <ReactSVG className={'imk'+ procent} src={img}/>
        </div>
        <p className="contentPaintText">
            {item.title}
        </p>
        <p className="contentPaintPercent" style={{color:item.colorProcent}}>
            {item.procent+'%'}
        </p>
    </div>
}

export default function Smiley(props:IComponentProps) {
    let inf = props.component;
    let listItems1;
    let listItems2;
    let listItems3;
        inf.items.map((number) =>{
            if (number.id === 1)
            {
                listItems1 = paint(number, number.icon)
            }
            if (number.id === 2){
                listItems2 = paint(number, number.icon)
            }
            if (number.id === 3){
                listItems3 = paint(number, number.icon)
            }
        }
    );

    return (
        <>
                {listItems1}
                {listItems2}
                {listItems3}
        </>
    );}
