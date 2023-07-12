import { cn } from "@bem-react/classname";
import "./style.scss";
// import photo from "../../plugs/personalArea/icon/user.png";

import CurrentTariff from "../../plugs/personalArea/currentTariff.json";
import AllTariffs from "../../plugs/personalArea/allTariffs.json";
import { ReactSVG } from "react-svg";

import User from "./icon/user.png";
import Gallery from "./icon/gallery.svg";
import Cake from "./icon/cake.svg";
import Building from "./icon/building.svg";
import Message from "./icon/sms.svg";
import Call from "./icon/call.svg";
import Tag from "./icon/tag.svg";
import Arrow from "./icon/arrow.svg";
import Receive from "./icon/receive.svg";
import { useAppSelector } from "../../hooks/redux";
import { ChangeEvent, InputHTMLAttributes, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useGetMeQuery, useLazyGetMeQuery, useSendUserAvatarMutation } from "../../store/api/user";
import { randomInt } from "crypto";
import { useDispatch } from "react-redux";
import { setProfileAvatar } from "../../store/slices/profileSlice";

type Props = {
    isArchive: boolean;
};

type IconsArr = {
    icon: string;
    value: string;
};

const AVATAR_TYPES = ["image/jpeg","image/png", "image/jpg"]

export default function PersonalArea({ isArchive = false }: Props) {

    const dispatch = useDispatch();

    const cnPersonalSettings = cn("personal-settings");
    const cnPersonalUser = cn("personal-area");
    const cnTariffBlock = cn("tariff-block");
    const cnArchiveTariff = cn("archive-tariff");

    const store = useAppSelector((state) => state.profile.user);
    const storeAvatar = useAppSelector((state) => state.profile.avatar);

    const [storeUser, setStoreUser] = useState(store);
    const [iconArr, setIconArr] = useState<IconsArr[]>([]);

    useEffect(() => {
        if (store && typeof store !== null && store!.firstname) {
            setStoreUser(store);
            setIconArr([
                {
                    icon: Cake,
                    value: store.birthday.split("-").reverse().join("."),
                },
                { icon: Building, value: store.city },
                { icon: Message, value: store.email },
                { icon: Call, value: store.phone },
            ]);
        }
    }, [store]);

    // const avatarRef = useRef<HTMLImageElement>(null);
   
    const [sendUserAvatar, userAvatarResponse] = useSendUserAvatarMutation();
    const { isSuccess, isError } = userAvatarResponse;

    const changeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newAvatarFile = e.target.files[0];
            if(AVATAR_TYPES.includes(newAvatarFile.type)) {
                await sendUserAvatar(newAvatarFile);
                await dispatch(setProfileAvatar(URL.createObjectURL(newAvatarFile)));
                // avatarRef!.current!.src = URL.createObjectURL(newAvatarFile);
            }
        }
    };

    useEffect(()=>{
        if(isSuccess) {
            // console.log("isSuccess", isSuccess);
        }
    },[isSuccess]);

    useEffect(()=>{
        if(isError) console.log(userAvatarResponse)
    },[isError])

    return (
        <div className={cnPersonalSettings()}>
            <div className={cnPersonalSettings("left")}>
                <div className={cnPersonalUser("")}>
                    <div className={cnPersonalUser("photo")}>
                        {storeUser && (
                            <img
                                key={storeUser.id}
                                src={storeAvatar}
                                alt={storeUser!.firstname}
                            />
                        )}
                    </div>
                    <div className={cnPersonalUser("name")}>
                        {storeUser && (
                            <span>{`${storeUser!.firstname} ${
                                storeUser!.lastname
                            }`}</span>
                        )}{" "}
                    </div>
                    <label className={cnPersonalUser("btn")}>
                        <ReactSVG src={Gallery} />
                        <span>{"Изменить фото"}</span>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            style={{ display: "none" }}
                            onChange={changeAvatar}
                        />
                    </label>
                    <ul className={cnPersonalUser("list")}>
                        {storeUser &&
                            iconArr.map((el, ind) => (
                                <li
                                    key={ind}
                                    className={cnPersonalUser("item")}
                                >
                                    <ReactSVG src={el.icon} />
                                    <span>{el.value}</span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div className={cnPersonalSettings("right")}>
                <div className={cnTariffBlock()}>
                    <div className={cnTariffBlock("description")}>
                        <ReactSVG src={Tag} />
                        <div className={cnTariffBlock("description-list")}>
                            <p className={cnTariffBlock("text")}>
                                {"Текущий тариф"}
                            </p>
                            <p className={cnTariffBlock("text")}>
                                {CurrentTariff.data.tariff}
                            </p>
                            <p
                                className={cnTariffBlock("text")}
                            >{`Осталось ${CurrentTariff.data.left} репетиций`}</p>
                        </div>
                    </div>
                    <button className={cnTariffBlock("btn")}>
                        <span>{"Пополнить"}</span>
                        <ReactSVG src={Arrow} />
                    </button>
                </div>
                <div className={cnArchiveTariff()}>
                    <div className={cnArchiveTariff("header")}>
                        <p className={cnArchiveTariff("title")}>
                            {"История платежей"}
                        </p>
                        <button className={cnArchiveTariff("btn")}>
                            <ReactSVG src={Receive} />
                            <span>{"Выгрузить чек"}</span>
                        </button>
                    </div>
                    <div className={cnArchiveTariff("list-wrapper")}>
                        <ul className={cnArchiveTariff("list")}>
                            <li className={cnArchiveTariff("item")}>
                                <p className={cnArchiveTariff("item-date")}>
                                    {"Дата"}
                                </p>
                                <p className={cnArchiveTariff("item-tariff")}>
                                    {"Тариф"}
                                </p>
                                <p className={cnArchiveTariff("item-sum")}>
                                    {"Сумма"}
                                </p>
                                <p className={cnArchiveTariff("item-period")}>
                                    {"Период"}
                                </p>
                            </li>
                            {isArchive &&
                                AllTariffs &&
                                AllTariffs.values.map((el, ind) => (
                                    <li
                                        key={ind + 1}
                                        className={cnArchiveTariff("item")}
                                    >
                                        <p
                                            className={cnArchiveTariff(
                                                "item-date"
                                            )}
                                        >
                                            {el.date}
                                        </p>
                                        <p
                                            className={cnArchiveTariff(
                                                "item-tariff"
                                            )}
                                        >
                                            {" "}
                                            <span>{el.tariff}</span>
                                            {`, ${el.repetition}`}
                                        </p>
                                        <p
                                            className={cnArchiveTariff(
                                                "item-sum"
                                            )}
                                        >
                                            {el.sum}
                                        </p>
                                        <p
                                            className={cnArchiveTariff(
                                                "item-period"
                                            )}
                                        >
                                            {el.period}
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


