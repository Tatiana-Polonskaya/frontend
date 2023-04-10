import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import MenuItem from "./MenuItem";
import {HandySvg} from 'handy-svg';
import iconSrc from './icons/logo-mini.svg';

import images from "./icons";
import "./style.scss";

const cnMenu = cn("menu");

// type Props = {
//     titleMenu: Array<Object>;
// };

export default function Menu() {

    const titleMenu = [
        {
            id:1,
            title:'Главная',
            url:'',
            img: images.Home,
        },
        {
            id:2,
            title:'Обучение',
            url:'url1',
            img: images.Teacher,
        },
        {
            id:3,
            title:'Репетиция',
            url:'url1',
            img:images.Repetition,
        },
        {
            id:4,
            title:'Импровизация',
            url:'url1',
            img:images.Improvization,
        },
        {
            id:5,
            title:'Дневник',
            url:'url1',
            img:images.Book,
        },
        {
            id:6,
            title:'Настройки',
            url:'url1',
            img:images.Setting,
        },
        {
            id:7,
            title:'Выход',
            url:'url1',
            img:images.Logout,
        },
]

    return <div className={cnMenu()}>
            
            <HandySvg
                src={iconSrc}
                className="Logo"
            />

            <ul>
            { titleMenu.map( el=>{ 
                return <li><MenuItem item={el} id={el.id}/></li>
                })
                }
            </ul>
        </div>;
}
