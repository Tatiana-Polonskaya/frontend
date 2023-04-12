import { cn } from "@bem-react/classname";
import CarouselItem from "./CarouselItem";
import "./style.scss";


const cnHeader = cn("header");

//props: Props
//className={cnHeader("content")}
export default function Carousel() {
    return (
        <div className={cnHeader()}>
            <div >
                <CarouselItem />
            </div>
        </div>
    );
}
