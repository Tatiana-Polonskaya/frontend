import React from 'react';
import { ReactSVG } from 'react-svg'
import './style.css'
import {ISimelDescription} from "../../../models/graph/inteface/ISimelDescription";
import {ISimel} from "../../../models/graph/inteface/ISimel";

interface IComponentProps {
    component: ISimel
}
function chekPrecent (inf:number){
    if(inf <= 5){
        return "imk1"
    }
    if(inf <= 10){
        return "imk2"
    }
    if(inf<=20){
        return "imk3"
    }
    if(inf <= 30){
        return "imk4"
    }
    if(inf<=40){
        return "imk5"
    }
    if(inf <= 50){
        return "imk6"
    }
    if(inf<=60){
        return "imk7"
    }
    if(inf<=70){
        return "imk8"
    }
    if(inf<= 80){
        return "imk9"
    }
    if(inf<=90){
        return "imk10"
    }
    if(inf <= 100){
        return "imk11"
    }

}
function paint (item:ISimelDescription, img:string ){
    return <div className='contentPaint'>
        <div >
            <ReactSVG className={chekPrecent(100 - item.procent)} src={img}/>
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
