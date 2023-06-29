
import { cn } from "@bem-react/classname";
import "./style.scss";
import { ReactNode } from "react";

type Props = {
    id:number,
    value: string,
    name:string,
    checked:boolean,
    handleOnChange:Function,
    children:ReactNode,
} 


export default function CheckBoxItem(props: Props) {
    const cnCheckBoxItem = cn("CheckBoxItem");
 
    return (
        <div className={cnCheckBoxItem()}>
            <label className={cnCheckBoxItem("item-label")}>
                <input
                    type="checkbox"
                    id={`checkbox-item-${props.id}`}
                    value={props.value}
                    name={props.name}
                    checked={props.checked}
                    onChange={()=>props.handleOnChange}
                    className={cnCheckBoxItem("item-input")}
                />    
                <span className={cnCheckBoxItem("item-span")}>
                    {props.children}
                </span>
            </label>
        </div>
    );
}
