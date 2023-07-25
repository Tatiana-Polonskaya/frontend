import React from "react";
import slip from "./img/спящий.svg";
import crazy from "./img/безумный.svg";
import medium from "./img/средне.svg";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import EnergyLine from "../EnergyLine";
import "./style.scss";

const cnEnergySmile = cn("energy-smile");

type Props = {
    energy: number;
};
function paintSmile(img: string, className: string, text: string) {
    return (
        <>
            <div className={cnEnergySmile(className)}>
                <ReactSVG src={img} className={cnEnergySmile("center-smile")} />
                {text}
            </div>
        </>
    );
}
function paint(energy: number) {
    if (energy < 0.01) {
        energy = 0.0136;
    }
    if (energy < 0.5) {
        return (
            <div className={cnEnergySmile()}>
                {paintSmile(slip, "smile", "Спящий")}
                <EnergyLine value={energy * 100} maxValue={50} />
                {paintSmile(medium, "smile1", "Энергичный")}
                <EnergyLine value={0} maxValue={50} />
                {paintSmile(crazy, "smile1", "Безумный")}
            </div>
        );
    }
    if (energy === 0.5) {
        return (
            <div className={cnEnergySmile()}>
                {paintSmile(slip, "smile", "Спящий")}
                <EnergyLine value={50} maxValue={50} />
                {paintSmile(medium, "smile", "Энергичный")}
                <EnergyLine value={0} maxValue={50} />
                {paintSmile(crazy, "smile1", "Безумный")}
            </div>
        );
    }
    if (energy > 0.5) {
        return (
            <div className={cnEnergySmile()}>
                {paintSmile(slip, "smile", "Спящий")}
                <EnergyLine value={50} maxValue={50} />
                {paintSmile(medium, "smile", "Энергичный")}
                <EnergyLine value={energy * 50} maxValue={50} />
                {paintSmile(crazy, "smile1", "Безумный")}
            </div>
        );
    }
}

export default function EnergySmile(props: Props) {
    return <>{paint(props.energy * 0.01)}</>;
}
