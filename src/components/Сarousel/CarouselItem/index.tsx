import { ReactSVG } from "react-svg"
import { cn } from "@bem-react/classname";

import "./style.scss"

type Props = {
    children?: number;
};
type Item ={
    
}


const cnCarouselItem = cn("menu-item")

export default function CarouselItem(props: Props) {
    return (
        <div className={cnCarouselItem()}>
        </div>
    );
}
