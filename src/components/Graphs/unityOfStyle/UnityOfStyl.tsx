import React from "react";
import "./UnityOfStyl.css";
import PieChartBlock from "../PieChartBlock";
import { IPieChart } from "../../../models/graph/inteface/IPieChart";

type Props = {
    scientific: number;
    official: number;
    publicistic: number;
    colloquial: number;
    artistic: number;
};

function UnityOfStyl(props: Props) {
    return (
        <>
            <div className="inf">
                <PieChartBlock component={props} />
            </div>
        </>
    );
}

export default UnityOfStyl;
