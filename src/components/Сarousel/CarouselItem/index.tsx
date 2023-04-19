import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";

import "./style.scss";

type Props = {
    item: Item;
};
type Item = {
    img: string;
    title: string;
    url: string;
};


const cnCarouselItem = cn("carouse-item");

export default function CarouselItem(props: Props) {
    return (
        <div className={cnCarouselItem()}>
            <div
                className={cnCarouselItem("img-block")}
                style={{ backgroundImage: `url(${props.item.img})` }}
            >
                <div className={cnCarouselItem("button")}>
                    <img src="/images/button-play.png" />
                </div>
            </div>
            <p>{props.item.title}</p>
        </div>
    );
}
