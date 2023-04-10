import {HandySvg} from 'handy-svg';
import { ReactComponentElement, ReactElement, ReactNode, SVGProps } from 'react';

type Props = {
    id: number;
    item: Item;
};
type Item ={
    title: string,
    url: string,
    img: string,
}

export default function MenuItem(props: Props) {
    
    return <>
            <span className='span-logo'>
                <HandySvg
                    src={props.item.img}
                    className="ul-logo"
                />
            </span>
             <span>{props.item.title}</span>
            
        </>
}