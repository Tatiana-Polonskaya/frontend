import React, {useState} from 'react';
import Scale from "../Scale";
import './style.scss'
import text from './img/text.svg'
import video from './img/video.svg'
import volume_high from './img/volume-high.svg'
import {IScaleDataType} from "../../../models/graph/inteface/scale";
import {ReactSVG} from "react-svg";
import GraphColor from "../../../models/graph/_colors";
import { cn } from "@bem-react/classname";

type item = {
    seq_number: number,
    time_start: number,
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
type Props = {
    values : item []
}
const CN = cn("EmotionalScale");


function covertData(data:any, inf:IScaleDataType){
    for (let i = 0; i < data.length - 1; i++){
        if (data[i].neutral){
            inf.item.push({
                title:"",
                value:data[i].neutral * 100,
                color:GraphColor.GRAY,
            });
        }
        if (data[i].happiness){
            inf.item.push({
                title:"",
                value:data[i].neutral * 100,
                color:GraphColor.GREEN,
            });
        }
        if (data[i].anger){
            inf.item.push({
                title:"",
                value:data[i].neutral * 100,
                color:GraphColor.RED,
            });
        }
    }
}
export default function EmotionalScale(props :Props) {

    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index:any) => setActiveIndex(index);
    const checkActive = (index:any, className:any) => activeIndex === index ? className : "";
    let dataAudio = props.values.map(n=> n.audio);
    let dataText = props.values.map(n=> n.text);
    let dataVideo =props.values.map(n=> n.video);
    let infVideo: IScaleDataType = ({
        item:[],
    });
    let infText: IScaleDataType = ({
        item:[],
    });
    let infAudio: IScaleDataType = ({
        item:[],
    });
    console.log(dataAudio);
    console.log('45454545454')

    covertData(dataAudio, infAudio);
    covertData(dataText, infText);
    covertData(dataVideo, infVideo);

    console.log(infAudio);
    console.log('232323232')

    return (
        <>
            <div className={CN("textBloc")}>
                <div className={CN("text1")}>
                    <b className="textInfTitle1"> Эмоциональность</b> - способность выражать свои мысли и идеи с помощью энергичного, живого стиля выступления, который передает позитивную эмоциональную окраску и воодушевление.
                </div>
                <div className={CN("blocksAll")}>
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
            <div className="EmotionalScaletabs">
                <button
                    className={`EmotionalScaletab ${checkActive(1, "EmotionalScaleactive")}`}
                    onClick={() => handleClick(1)}
                >
                    <ReactSVG src={video}/>
                    Видео
                </button>
                <button
                    className={`EmotionalScaletab ${checkActive(2, "EmotionalScaleactive")}`}
                    onClick={() => handleClick(2)}
                >
                    <ReactSVG src={volume_high}/>
                    Аудио
                </button>
                <button
                    className={`EmotionalScaletab ${checkActive(3, "EmotionalScaleactive")}`}
                    onClick={() => handleClick(3)}
                >
                    <ReactSVG src={text}/>
                    Текст
                </button>
            </div>
            <div className="panels">
                <div className={`panel ${checkActive(1, "EmotionalScaleactive")}`}>
                    <Scale component={infVideo}/>
                </div>
                <div className={`panel ${checkActive(2, "EmotionalScaleactive")}`}>
                    <Scale component={infAudio}/>
                </div>
                <div className={`panel ${checkActive(3, "EmotionalScaleactive")}`}>
                    <Scale component={infText}/>
                </div>
            </div>
        </>
    );
}

