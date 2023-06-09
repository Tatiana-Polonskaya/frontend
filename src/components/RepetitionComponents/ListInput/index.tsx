import {cn} from "@bem-react/classname";

import "./style.scss";
import {ReactNode, useEffect, useState} from "react";
import { ReactSVG } from "react-svg";
import deleteBtn from './assets/delete-btn.svg';
import plusBtn from './assets/plus-btn.svg';


export default function ListInput() {
    
    const ListInputStyle = cn("ListInput");

    const [countInput, setCountInput] = useState(1);
    const [inputValues, setInputValues] = useState<Array<String>>(new Array(countInput).fill(""));
    const [inputContent, setInputContent] = useState<Array<ReactNode>>([]);
    
    let tempContent:Array<ReactNode> = [];

    if(inputContent.length < 1){
        for( let i = 0; i< countInput; i++){
            tempContent.push(
                <div className={ListInputStyle("block-input")}> 
                <div className={ListInputStyle("block-input-span")}><span className={ListInputStyle("index")}> {i + 1}:</span></div>
                <div className={ListInputStyle("block-input-input")}><input  id={""+i} key={i} className={ListInputStyle("input")} onChange={(e)=>addInputValues(i, e.target.value)}/></div>
                
                <p className={ListInputStyle("block-input-btn")} 
                    onClick={()=>removeInput(i)}>
                        <ReactSVG src={deleteBtn}/>
                    </p>
                </div>
            );
        }
        setInputContent(tempContent);
    }    

    const removeInput = (index : number) => {

        let temp = inputValues;
        temp = [
            ...temp.slice(0, index),
            ...temp.slice(index + 1)
        ];

        console.log("inputValues", temp)

        setInputValues(temp);

        let tempContent = inputContent;
        
        tempContent = [
            ...tempContent.slice(0, index),
            ...tempContent.slice(index + 1)
        ];
        setInputContent(tempContent);

    };

    const addInputValues = (index:number, value:string)=>{
        let temp = inputValues;
        temp[index] = value;
        setInputValues(temp);
        console.log(inputValues);
    };

    useEffect(()=>{
        let tempInputContent = inputContent;
        const nextIndex = tempInputContent.length;

        if(countInput > nextIndex){

        tempInputContent.push(
            <div className={ListInputStyle("block-input")}> 
            <span className={ListInputStyle("index")}>{nextIndex+1}:</span> 
            <input id={""+nextIndex} key={nextIndex} className={ListInputStyle("input")} onChange={(e)=>addInputValues(nextIndex, e.target.value)}/>
            <p className={ListInputStyle("block-input-btn")}  onClick={()=>removeInput(nextIndex)}>
            <ReactSVG src={deleteBtn}/>
                </p> 
            </div>
        );
        setInputContent(tempInputContent);}
    },[countInput])


    const addInput = () =>{

        let temp = inputValues;
        temp.push("");
        setInputValues(temp);
        setCountInput(prev=> ++prev);
    }

    return (

        <div className={ ListInputStyle()}>
            <div className={ListInputStyle("list-block-input")}>
                {inputContent}
            </div>
            
            <button className={ListInputStyle("button")} onClick={
                () =>addInput()
            }>
                <ReactSVG src={plusBtn}/>
                Добавить еще пункт
            </button>
           </div>
    );
}
