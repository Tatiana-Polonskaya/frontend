import { useState } from "react";
import "./Informative.css";
import Inf from "./index";
import { GraphContext } from "../-Base/helpers";
type valuesItem = {
    seq_number: number;
    time_start: number;
    time_end: number;
    text: string;
    type: string;
};
type Props = {
    values: valuesItem[];
};
function Informative(props: Props) {
    const [currentTime, setCurrentTime] = useState(0);
    return (
        <>
            <div className="inf">
                <GraphContext.Provider value={{ currentTime, setCurrentTime }}>
                    <Inf items={props.values} />
                </GraphContext.Provider>
            </div>
        </>
    );
}
export default Informative;
