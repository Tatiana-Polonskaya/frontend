import React from "react";
import rupor from "./img/mouthpiese.svg";
import { ReactSVG } from "react-svg";
import "./Eloquence.css";
import bigCloud from "./img/bigCloud.svg";
import Testt from "./img/bubble";
import Bubble2 from "./img/bubble2";
import Bubble3 from "./img/bubble3";
import Bubble4 from "./img/bubble4";

type Props = {
    data: {
        values: {
            parasitic_words: number;
            short_sentences: number;
            short_words: number;
            action_words: number;
            parasitic_words_list?: {};
        };
    };
};
function Eloquence(props: Props) {
    let infEloquence = props.data;
    return (
        <>
            <div className="allEloquence">
                <div className="allImg">
                    <div className="rImg">
                        <ReactSVG src={rupor} />
                    </div>
                    <div className="cloud">
                        <div
                            className="bubbles"
                            style={{ background: bigCloud }}
                        >
                            <div className="parasitic_words">
                                <div className="textparasitic_words">
                                    <p className="txt">
                                        {infEloquence.values.parasitic_words}
                                    </p>
                                    <p className="txt2">слова-паразиты</p>
                                </div>
                                <Testt component={"#F35B60"} />
                            </div>
                            <div className="short_sentences">
                                <div className="textshort_sentences">
                                    <p className="txt">
                                        {infEloquence.values.short_sentences}
                                    </p>
                                    <p className="txt2">короткие </p>
                                    <p className="txt2"> предложения</p>
                                </div>
                                <Bubble2 component={"#13D784"} />
                            </div>
                            <div className="short_words">
                                <div className="textshort_words">
                                    <p className="txt">
                                        {infEloquence.values.short_words}
                                    </p>
                                    <p className="txt2">короткие слова</p>
                                </div>
                                <Bubble3 component={"#13D784"} />
                            </div>
                            <div className="active_words">
                                <div className="textactive_words">
                                    <p className="txt">
                                        {infEloquence.values.action_words}
                                    </p>
                                    <p className="txt2">активные </p>
                                    <p className="txt2"> слова</p>
                                </div>
                                <Bubble4 component={"#13D784"} />
                            </div>
                        </div>
                        <div className="imgbigCloud">
                            <ReactSVG className="bigCloud" src={bigCloud} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Eloquence;
