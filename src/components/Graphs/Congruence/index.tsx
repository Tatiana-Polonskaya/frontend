import React from 'react';
import './style.scss'
import {cn} from "@bem-react/classname";
import textt from './img/text.svg';
import video from './img/video.svg';
import volume from './img/volume-high (1).svg';
import angry from './img/смайл злость.svg';
import happy from './img/смайл радость.svg';
import ok from './img/смайл нейтральность.svg';
import {ReactSVG} from "react-svg";
import GraphColor from "../../../models/graph/_colors";



const CN = cn("congruence");

function paint(videoItem: string, volumeItem:string, textItem:string, text:string, img:string, ccolors: string){
    return  <div className={CN("block")}>
        <div className={CN("imgText")}>
            <ReactSVG src={img}/>
            <div className={CN("title")}>{text}</div>
        </div>
        <div className={CN("circle")} >
            <div className={CN("video")} style={{width: videoItem, height: videoItem , background: ccolors}}>
                <ReactSVG src={video}/>
            </div>
            <div className={CN("video")}style={{width: volumeItem , height: volumeItem , background: ccolors}}>
                <ReactSVG src={volume}/>
            </div>
            <div className={CN("video")}style={{width: textItem, height: textItem, background: ccolors}}>
                <ReactSVG src={textt}/>
            </div>
        </div>
    </div>
}
function chek(item:number){
    if(item <= 0.49){
        return "50"
    }
    else {
        return (item*100).toString()
    }
}

type Props= {
    diameter: {
        video: {
            neutral: number,
            happiness: number,
            anger: number
        },
        audio: {
            neutral: number,
            happiness: number,
            anger: number
        },
        text: {
            neutral: number,
            happiness: number,
            anger: number
        }
    }
}

export default function Congruence(props: Props) {
    let diameter = props.diameter;

    return (
        <>
            <div className={CN()}>
                {paint((chek(diameter.video.neutral) + "px"),
                    (chek(diameter.audio.neutral) + "px"),
                    (chek(diameter.text.neutral) + "px"),
                    "Нейтрально", ok, GraphColor.GRAY)}
                {paint((chek(diameter.video.happiness) + "px"),
                    (chek(diameter.audio.happiness) + "px"),
                    (chek(diameter.text.happiness) + "px"),
                    "Радость", happy, "rgba(16, 206, 126, 0.2)")}
                {paint((chek(diameter.video.anger).toString() + "px"),
                    (chek(diameter.audio.anger).toString() + "px"),
                    (chek(diameter.text.anger).toString() + "px"),
                    "Злость",angry,"rgba(243, 91, 96, 0.2)")}
            </div>
        </>
    );
}

