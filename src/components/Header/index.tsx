import "./style.scss";
import NoPhoto from "./assets/no-photo.png";

type Props = {
    imageUrl?: string;
    displayName?: string;
};

export default function Header(props: Props) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-content__profile">
                    <img
                        src={props.imageUrl || NoPhoto}
                        alt=""
                        className="header-content__photo"
                    />
                    <div className="">
                        {props.displayName ? (
                            <>
                                <span>Добрый день,</span>
                                <span>{props.displayName}</span>
                            </>
                        ) : (
                            <span>Добрый день!</span>
                        )}
                    </div>
                </div>
                <div>Уведомления</div>
            </div>
        </header>
    );
}
