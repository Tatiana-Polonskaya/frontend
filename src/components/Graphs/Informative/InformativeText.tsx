import React from "react";
import "./styleText.scss";
function InformativeText() {
    return (
        <>
            <div className="blocText">
                <div className="textInf">
                    <b className="textInfTitle">Информативность </b>
                    определяется предоставлением точной информации, полнота
                    которой снижается при появлении в речи не несущих смысла
                    слов и длительных пауз, а также неречевых звуков.
                </div>
                <div className="blocColor">
                    <div className="Square">
                        <div
                            className="colorSquare"
                            style={{ background: "#410DAE" }}
                        >
                            {" "}
                        </div>
                        <div className="textSquare">слова-паразиты</div>
                    </div>
                    <div className="Square">
                        <div
                            className="colorSquare"
                            style={{ background: "#FE6972" }}
                        >
                            {" "}
                        </div>
                        <div className="textSquare">неречевые звуки</div>
                    </div>
                    <div className="Square">
                        <div
                            className="colorSquare"
                            style={{ background: "#FFB800" }}
                        >
                            {" "}
                        </div>
                        <div className="textSquare">пустые паузы</div>
                    </div>
                    <div className="Square">
                        <div
                            className="colorSquare"
                            style={{ background: "#ADB9D4" }}
                        >
                            {" "}
                        </div>
                        <div className="textSquare">информативная часть</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InformativeText;
