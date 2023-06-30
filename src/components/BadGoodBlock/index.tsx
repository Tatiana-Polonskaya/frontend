import React from 'react';
import { cn } from "@bem-react/classname";
import {ReactSVG} from "react-svg";
import './style.scss';
import okImg from './img/ок.svg';
import badImg from './img/bad.svg';
import goodImg from './img/good.svg';

const CN = cn("BadGoodBlock");

function paintList (a:string[]){
    if(a==null)
    {
        return <div className={CN("list")}>
            <div className={CN("title")}>
                Никаких значительных улучшений
            </div>
            <div className={CN("list")}>
                Продолжай тренироваться и у тебя точно все  получится!
            </div>
        </div>
    }
       // @ts-ignore
        return <ul> {a.forEach(elem=><li>{elem}</li>)}</ul>



}
export default function BadGoodBlock() {
    let a= ["В речи появилось новое слово-паразит “как бы”", "Слишком большие паузы между блоками текста"]

    return (
        <>
            <div className={CN("all")}>
                <div className={CN("text")}>
                    <ReactSVG src={okImg}/>
                </div>
                <div className={CN("image")}>
                    <div className={CN("title")}>
                        Никаких значительных улучшений
                    </div>
                    <div className={CN("list")}>
                        Продолжай тренироваться и у тебя точно все  получится!
                    </div>
                </div>
            </div>
        </>
    );
}