import "./UnityOfStyl.css";
import PieChartBlock from "../PieChartBlock";

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
