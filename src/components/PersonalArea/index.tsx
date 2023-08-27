import { cn } from "@bem-react/classname";
import "./style.scss";

import CurrentTariff from "../../plugs/personalArea/currentTariff.json";
import AllTariffs from "../../plugs/personalArea/allTariffs.json";
import { ReactSVG } from "react-svg";

import User from "./icon/user.png";
import Cake from "./icon/cake.svg";
import Building from "./icon/building.svg";
import Message from "./icon/sms.svg";
import Call from "./icon/call.svg";
import Tag from "./icon/tag.svg";
import Arrow from "./icon/arrow.svg";
import Receive from "./icon/receive.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { useSendUserAvatarMutation } from "../../store/api/user";

import LoadImage from "./LoadImage";
import Gallery from "./icon/gallery.svg";
import AvatarEditor from "react-avatar-editor";
import { setProfileAvatar } from "../../store/slices/profileSlice";

type Props = {
    isArchive: boolean;
};

type IconsArr = {
    icon: string;
    value: string;
};

export default function PersonalArea({ isArchive = false }: Props) {
    const cnPersonalSettings = cn("personal-settings");
    const cnPersonalUser = cn("personal-area");
    const cnTariffBlock = cn("tariff-block");
    const cnArchiveTariff = cn("archive-tariff");

    const store = useAppSelector((state) => state.profile.user);
    const avatar = useAppSelector((state) => state.profile.avatar);

    const [storeUser, setStoreUser] = useState(store);
    const [iconArr, setIconArr] = useState<IconsArr[]>([]);
    const [active, setActive] = useState<string>();

    useEffect(() => {
        if (store && store!.firstname) {
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

    const [sendUserAvatar, userAvatarResponse] = useSendUserAvatarMutation();
    const { isSuccess, isError } = userAvatarResponse;

    useEffect(() => {
        if (isSuccess) window.location.reload();
    }, [isSuccess]);

    useEffect(() => {
        if (isError) console.log(userAvatarResponse);
    }, [isError]);

    const changeActive = () => {
        !active ? setActive("active") : setActive("");
    };

    const closePopup = () => {
        changeActive();
    };

    const [editor, setEditor] = useState<AvatarEditor>();
    const [scaleValue, setScaleValue] = useState<number>();

    const [selectedImg, setSelectedImg] = useState<string>(
        `/api/users/account/avatar/${store.id}`,
    );

    const setEditorRef = (editor: AvatarEditor) => {
        setEditor(editor);
    };

    const onCrop = () => {
        if (editor) {
            editor!
                .getImage()
                .toBlob(
                    (res) => (res ? sendUserAvatar(res) : undefined),
                    "image/jpeg",
                );
            setNewPic(true);
            // editor!
            //     .getImageScaledToCanvas()
            //     .toBlob(
            //         (res) => (res ? sendUserAvatar(res) : undefined),
            //         "image/jpeg"
            //     );
        }
    };

    const onScaleChange = (scaleValue: number) => {
        setScaleValue(scaleValue);
    };

    const profileImageChange = (fileChangeEvent: any) => {
        fileChangeEvent.preventDefault();
        const file = fileChangeEvent.target.files![0];
        if (file) {
            const { type } = file;
            if (
                type.endsWith("jpeg") ||
                type.endsWith("jpg")
                // || type.endsWith("png")
            ) {
                setSelectedImg(file);
            }
        }
    };

    const dispatch = useAppDispatch();
    const [newPic, setNewPic] = useState(false);

    useEffect(() => {
        if (newPic) {
            setNewPic(false);
            const getData = async () => {
                setTimeout(() => {
                    const newkey=Math.ceil(Math.random() * 100);
                    dispatch(setProfileAvatar(`/api/users/account/avatar/${store.id}?rnd=${newkey}`));
                }, 2000);
            };
            getData();
        }
    }, [newPic]);

    return (
        <div className={cnPersonalSettings()}>
            <div
                className={cnPersonalUser(
                    "shield",
                    cnPersonalUser(`shield-${active}`),
                )}
                onClick={closePopup}
            ></div>
            <div className={cnPersonalSettings("left")}>
                <div className={cnPersonalUser("")}>
                    <div className={cnPersonalUser("photo")}>
                        {avatar && (
                            <img
                                src={avatar}
                                alt={store.lastname}
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
                    <form>
                        <input
                            className={cnPersonalUser("input")}
                            id="image"
                            type="file"
                            name="img"
                            accept="image/jpeg"
                            onChange={profileImageChange}
                            onClick={changeActive}
                        />
                        <label
                            htmlFor="image"
                            className={cnPersonalUser(
                                "btn",
                                cnPersonalUser("label"),
                            )}
                        >
                            <ReactSVG src={Gallery} />
                            <span>{"Изменить фото"}</span>
                        </label>
                        <div
                            className={cnPersonalUser(
                                "change",
                                cnPersonalUser(`change-${active}`),
                            )}
                        >
                            <div className={cnPersonalUser("current-photo")}>
                                <LoadImage
                                    imageSrc={selectedImg}
                                    scaleValue={scaleValue}
                                    onScaleChange={onScaleChange}
                                    setEditorRef={setEditorRef}
                                    onCrop={onCrop}
                                    closePopup={closePopup}
                                />
                            </div>
                        </div>
                    </form>
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
                                                "item-date",
                                            )}
                                        >
                                            {el.date}
                                        </p>
                                        <p
                                            className={cnArchiveTariff(
                                                "item-tariff",
                                            )}
                                        >
                                            {" "}
                                            <span>{el.tariff}</span>
                                            {`, ${el.repetition}`}
                                        </p>
                                        <p
                                            className={cnArchiveTariff(
                                                "item-sum",
                                            )}
                                        >
                                            {el.sum}
                                        </p>
                                        <p
                                            className={cnArchiveTariff(
                                                "item-period",
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
