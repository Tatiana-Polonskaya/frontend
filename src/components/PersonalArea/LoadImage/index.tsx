import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import ReactAvatarEditor from "react-avatar-editor";

import "./style.scss";

import User from "./../icon/user.png";
import Arrow from "./../icon/arrow.svg";

type Props = {
    imageSrc?: string;
    scaleValue?: number;
    onScaleChange: Function;
    setEditorRef?: any;
    onCrop?: any;
    closePopup: Function;
};

export default function LoadImage({
    imageSrc,
    onCrop,
    setEditorRef,
    scaleValue,
    onScaleChange,
    closePopup,
}: Props) {
    // const cnPersonalUser = cn("personal-area");
    const cnChangeFoto = cn("change-foto");
    const cnTariffBlock = cn("tariff-block");

    const changeScale = (scaleValueEvent: { target: { value: string } }) => {
        const scaleValue = parseFloat(scaleValueEvent.target.value);
        onScaleChange(scaleValue);
    };
    const cropImg = (e: { preventDefault: () => void }) => {
        // сюда вставить отправку на сервер
        e.preventDefault();
        onCrop();
        closePopup();
    };
    return (
        <>
            <ReactAvatarEditor
                scale={scaleValue}
                width={320}
                height={400}
                rotate={parseFloat("0")}
                image={imageSrc ? imageSrc : User}
                ref={setEditorRef}
                className={cnChangeFoto("avatar")}
            />
            <div>
                <input
                    name="scale"
                    type="range"
                    value={scaleValue}
                    onChange={changeScale}
                    min={"1"}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                    className={cnChangeFoto("range")}
                />
            </div>
            <button onClick={cropImg} className={cnTariffBlock("btn")}>
                <span>{"Принять"}</span>
                <ReactSVG src={Arrow} />
            </button>
        </>
    );
}
