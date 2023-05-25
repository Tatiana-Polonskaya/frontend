import { cn } from "@bem-react/classname";
import CarouselItem from "./CarouselItem";
import { ReactSVG } from "react-svg";

import arrow_left from "./arrows/arrow-left.svg";
import arrow_right from "./arrows/arrow-right.svg";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "./slick-theme.scss";

import "./style.scss";

type ArrowProps = {
    className?: string;
    onClick?: any;
};

function SampleNextArrow(props: ArrowProps) {
    const { className,onClick } = props;
    return (
        <div className={className}>
            <ReactSVG
                src={arrow_right}    
                onClick={onClick}
            />
        </div>
        
    );
}

function SamplePrevArrow(props: ArrowProps) {
    const { className, onClick } = props;
    return (
        <div className={className}>
            <ReactSVG
                src={arrow_left}
                onClick={onClick}
            />
        </div>
    );
}

const cnСarouse = cn("carouse");//className={cnСarouse()}

export default function Carousel() {
    const items = [
        {
            id: 0,
            img: "/images/Ellipse.png",
            title: "Что такое Speech Up?",
            url: "",
        },
        {
            id: 1,
            img: "/images/Ellipse.png",
            title: "Как правильно записать репетицию?",
            url: "",
        },
        {
            id: 2,
            img: "/images/Ellipse.png",
            title: "Импровизация: жанр для юмористов или профессиональный навык?",
            url: "",
        },
        {
            id: 3,
            img: "/images/Ellipse.png",
            title: "Импровизация: жанр для юмористов или профессиональный навык?",
            url: "",
        },
        {
            id: 4,
            img: "/images/Ellipse.png",
            title: "Импровизация: жанр для юмористов или профессиональный навык?",
            url: "",
        },
        {
            id: 5,
            img: "/images/Ellipse.png",
            title: "Импровизация: жанр для юмористов или профессиональный навык?",
            url: "",
        },
        {
            id: 6,
            img: "/images/Ellipse.png",
            title: "Импровизация: жанр для юмористов или профессиональный навык?",
            url: "",
        },
        {
            id: 7,
            img: "/images/Ellipse.png",
            title: "Импровизация: жанр для юмористов или профессиональный навык?",
            url: "",
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div>
            <Slider {...settings} className="main-container">
                {items.map((el) => (
                    <CarouselItem item={el} key={el.id} />
                ))}
            </Slider>
        </div>
    );
}
