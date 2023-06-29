import React from 'react';
import './UnityOfStyl.css'
import PieChartBlock from "../PieChartBlock";
import {IPieChart} from "../../../models/graph/inteface/IPieChart";

type  Props={
    scientific: number,
    official: number,
    publicistic: number,
    colloquial: number,
    artistic: number
}
function UnityOfStyl(props:Props) {
  let inf1:IPieChart = {
      scientific: props.scientific,
      official: props.official,
      publicistic: props.publicistic,
      colloquial: props.colloquial,
      artistic: props.artistic
    }

    return (
        <>
            <div className="inf">
                <PieChartBlock component={inf1}/>
            </div>

        </>
    );
}

export default UnityOfStyl;