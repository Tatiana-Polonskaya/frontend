import { cn } from "@bem-react/classname";


import "./style.scss";

type Props = {
    item: Item;
    clickFunction: Function;
};

type Item = {
    img: string;
    title: string;
    author: string;
    avatar: string;
    views: number;
    publication_time: string;
    annotation?: string;
};

export default function VideoItem(props: Props) {
    
    const cnVideoItem = cn("video-item");

    return (
        <div className={cnVideoItem()}>

            <img src={props.item.img} alt='' className={cnVideoItem("picture")} onClick={()=>props.clickFunction()}/>

            <div className={cnVideoItem("author-block")}>

                <div className={cnVideoItem("author-block-title")}>
                    
                    <div className={cnVideoItem("logo")}>
                        <img className={cnVideoItem("logo-pic")} src={props.item.avatar} alt=''/>
                    </div>
                    <p>{props.item.author}</p>
                </div>

                <p>{props.item.publication_time}</p>
            </div>
            
            <p className={cnVideoItem("title")}>{props.item.title}</p>
        </div>
    );
}
