import React, {JSXElementConstructor, useState} from 'react';
import './style.scss'
import {cn} from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";
import {ReactSVG} from "react-svg";
import video from "../EmotionalScale/img/video.svg";
import volume_high from "../EmotionalScale/img/volume-high.svg";
import text from "../EmotionalScale/img/text.svg";

const CN = cn("congruenceScale");

type item ={
    time_start: number,
    value: number,
    type: string,
    time_end: number
}
type Props = {
        A_V: item[],
        A_T: item[],
        V_T: item[]
    }

export default function CongruenceScale( props: Props) {
    let data = props
    let previous = 0;
    let listItemA_T = data.A_T.map( function (item){
        let block;
        let buffer;
        if (item.value > 0.5) {
            let height = item.value < 0.65 ? 0.6 : 0.9;
            let color = (item.type == "angry") ? "#FE6972" : "#24F19B";
            if (item.time_start > previous) {
                buffer = <div style={{marginLeft:"2px", backgroundColor: GraphColor.GRAY, height: '30%',
                    width:((item.time_start - previous))+"%"}}>
                </div>
            }
            previous = item.time_end
            block = <div style={{marginLeft:"2px",backgroundColor: color, height: ((height * 100).toString()+"%"),
                width:((item.time_end-item.time_start)*2)+"%"}}>
            </div>
        }
        return <> {buffer} {block} </>
    });
    let listItemA_V = data.A_V.map( function (item){
        let block;
        let buffer;
        if (item.value > 0.5) {
            let height = item.value < 0.65 ? 0.6 : 0.9;
            let color = (item.type == "angry") ? "#FE6972" : "#24F19B";
            if (item.time_start > previous) {
                buffer = <div style={{marginLeft:"2px",backgroundColor: GraphColor.GRAY, height: '30%',
                    width:((item.time_start - previous))+"%"}}>
                </div>
            }
            previous = item.time_end
            block = <div style={{marginLeft:"2px",backgroundColor: color, height: ((height * 100).toString()+"%"),
                width:((item.time_end-item.time_start)*2)+"%"}}>
            </div>
        }
        return <> {buffer} {block} </>
    });
    let listItemV_T = data.V_T.map( function (item){
        let block;
        let buffer;
        if (item.value > 0.5) {
            let height = item.value < 0.65 ? 0.6 : 0.9;
            let color = (item.type == "angry") ? "#FE6972" : "#24F19B";
            if (item.time_start > previous) {
                buffer = <div style={{marginLeft:"2px",backgroundColor: GraphColor.GRAY, height: '30%',
                    width:((item.time_start - previous))+"%"}}>
                </div>
            }
            previous = item.time_end
            block = <div style={{marginLeft:"2px",backgroundColor: color, height: ((height * 100).toString()+"%"),
                width:((item.time_end-item.time_start)*2)+"%"}}>
            </div>
        }
        return <> {buffer} {block} </>
    });
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index:any) => setActiveIndex(index);
    const checkActive = (index:any, className:any) => activeIndex === index ? className : "";

    return (
        <>
            <div className={CN("textBloc")}>
                <div className={CN("text")}>
                    <b className="textInfTitle">Конгруэнтность </b> - согласованность эмоций, выражаемых в разных коммуникативных каналах (видео, аудио и текст из речи).
                </div>
                <div className={CN("bocksAll")}>
                    <div className={CN('blockText')}>
                        <div className={CN('block')} style={{background:"#7C8EB5"}}/>
                        <div className={CN('Text')}> нейтральная</div>
                    </div>
                    <div className={CN('blockText')}>
                        <div className={CN('block')} style={{background:"#24F19B"}}/>
                        <div className={CN('Text')}> радость</div>
                    </div>
                    <div className={CN('blockText')}>
                        <div className={CN('block')} style={{background:"#FE6972"}}/>
                        <div className={CN('Text')}> злость</div>
                    </div>
                </div>
            </div>
            <div className="congruenceScaletabs">
                <button
                    className={`congruenceScaletab ${checkActive(1, "congruenceScaleactive")}`}
                    onClick={() => handleClick(1)}
                >
                    <ReactSVG src={video}/>
                    Видео
                </button>
                <button
                    className={`congruenceScaletab ${checkActive(2, "congruenceScaleactive")}`}
                    onClick={() => handleClick(2)}
                >
                    <ReactSVG src={volume_high}/>
                    Аудио
                </button>
                <button
                    className={`congruenceScaletab ${checkActive(3, "congruenceScaleactive")}`}
                    onClick={() => handleClick(3)}
                >
                    <ReactSVG src={text}/>
                    Текст
                </button>
            </div>
            <div className="panels">
                <div className={`panel ${checkActive(1, "congruenceScaleactive")}`}>
                    <div className="content">
                        {listItemA_T}
                    </div>
                </div>
                <div className={`panel ${checkActive(2, "congruenceScaleactive")}`}>
                    <div className="content">
                        {listItemV_T}
                    </div>
                </div>
                <div className={`panel ${checkActive(3, "congruenceScaleactive")}`}>
                    <div className="content">
                        {listItemA_V}
                    </div>
                </div>
            </div>
        </>
    );
}