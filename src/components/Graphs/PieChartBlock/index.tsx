import React from 'react'
import './style.css'
import {ReactSVG} from "react-svg";
import {IPieChart} from "../../../models/graph/inteface/IPieChart";
import art from './img/artColor.svg'
import scientific from './img/scientificColor.svg';
import officialBusiness from './img/officialBusinessInColor.svg';
import journalistic from'./img/journalisticColor.svg';
import colloquial from './img/colloquialColor.svg'
interface IComponentProps {
    component: IPieChart
}
function chekPrecent(inf: number){


    if(inf == 1){
        return "imkPie0"
    }
    if(inf <= 5){
        return "imkPie1"
    }
    if(inf <= 10){
        return "imkPie2"
    }
    if(inf<=20){
        return "imkPie3"
    }
    if(inf <= 30){
        return "imkPie4"
    }
    if(inf<=40){
        return "imkPie5"
    }
    if(inf <= 50){
        return "imkPie6"
    }
    if(inf<=60){
        return "imkPie7"
    }
    if(inf<=70){
        return "imkPie8"
    }
    if(inf<= 80){
        return "imkPie9"
    }
    if(inf<=90){
        return "imkPie10"
    }
    if(inf <= 100){
        return "imkPie11"
    }

}
function paint (item:(string|number)[], img:string ){
    let precen = Number( item[0])
    return <div className='PieChart'>
        <div className='imgPieChartScintific'>
            <ReactSVG className={chekPrecent(precen)} src={img}/>
        </div>
        <p className="textPieChart">
            {item[1]}
        </p>
        <p className="precentPieChart" >
            {item[0]}%
        </p>
    </div>
}


export default function PieChartBlock(props: IComponentProps ) {
    let artInf =[ props.component.artistic.valueOf(),'художественный' ];
    let colloquialInf = [props.component.colloquial.valueOf(), 'разговорный'];
    let journalisticInf = [props.component.official.valueOf(), 'официально-деловой'];
    let scientificInf = [props.component.scientific.valueOf(), 'научный'];
    let officialBusinessInf = [props.component.publicistic.valueOf(), 'публицистический'];
    return (
        <>
            <div className='textPieChartBlock'>
                <b className="textInfTitle">Единство стиля </b> - использование определенного набора слов и выражений в зависимости от жанра, формата и стиля речи, с целью достижения определенных коммуникативных целей.
            </div>

             <div className='allPieChart'>
                 {paint(scientificInf,scientific)}
                 {paint(officialBusinessInf,officialBusiness)}
                 {paint(journalisticInf,journalistic)}
                 {paint(colloquialInf,colloquial)}
                 {paint(artInf,art)}
             </div>
        </>
    );
}
