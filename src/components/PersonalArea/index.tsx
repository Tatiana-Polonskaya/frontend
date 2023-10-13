/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cn } from "@bem-react/classname";
import "./style.scss";

import AllTariffs from "../../plugs/personalArea/allTariffs.json";
import { ReactSVG } from "react-svg";

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
import {
    useGetTraiffsQuery,
    useGetUserTraiffQuery,
    useSendPaidTariffMutation,
} from "../../store/api/tariff";
import { ITariff } from "../../models/tariff";
import ModalWindow from "../ModalWindow/ModalWindow";
import TarifCard from "../TarifCard";
import { updateTariffAnswers } from "../../store/slices/tariff";
import RoutesEnum from "../../models/routes";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const store = useAppSelector((state) => state.profile.user);
    const avatar = useAppSelector((state) => state.profile.avatar);

    const tariff = useGetUserTraiffQuery();
    const [userTariff, setUserTariff] = useState<ITariff>();

    useEffect(() => {
        if (tariff.data && tariff.isSuccess && tariff.data.data) {
            setUserTariff(tariff.data.data.at(0));
        }
    }, [tariff]);

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
        `/api/users/account/avatar/${store.id}`
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
                    "image/jpeg"
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
                    const newkey = Math.ceil(Math.random() * 100);
                    dispatch(
                        setProfileAvatar(
                            `/api/users/account/avatar/${store.id}?rnd=${newkey}`
                        )
                    );
                }, 5000);
            };
            getData();
        }
    }, [newPic]);

    /* MODAL */
    const [isModal, setModal] = useState(true);

    const tariffs = useGetTraiffsQuery();
    const [basicTariffs, setBasicTariffs] = useState<ITariff[]>([]);

    useEffect(() => {
        if (tariffs.data && tariffs.data.data && tariffs.isSuccess) {
            setBasicTariffs(
                [...tariffs.data!.data]
                    .sort((x, y) => x.price - y.price)
                    .filter((x) => x.price !== 0)
            );
        }
    }, [tariffs]);

    const [checkedTarif, setCheckedTarif] = useState("");

    const clickOnCard = (id: string) => {
        setCheckedTarif(id);
    };

    const [sendPaidTarifffRequest, sendPaidTariffResponse] =
        useSendPaidTariffMutation();

    const clickOnButton = async () => {
        if (checkedTarif !== "") {
            const priceCheckedTariff =
                basicTariffs.length > 0
                    ? basicTariffs?.filter((x) => x.id == checkedTarif).at(0)
                          ?.price
                    : 0;

            await sendPaidTarifffRequest({
                price: priceCheckedTariff ? priceCheckedTariff : 0,
                user_id: store.id,
                tarif_id: checkedTarif,
                key: "",
            });

            dispatch(
                updateTariffAnswers({
                    id: checkedTarif,
                    price: priceCheckedTariff ? priceCheckedTariff : 0,
                })
            );
        }
    };

    useEffect(() => {
        if (sendPaidTariffResponse.isSuccess) {
            if (sendPaidTariffResponse.data.success) {
                navigate(RoutesEnum.PAY);
            } else {
                console.log(sendPaidTariffResponse);
            }
        }
    }, [sendPaidTariffResponse]);

    return (
        <>
            <div className={cnPersonalSettings()}>
                <div
                    className={cnPersonalUser(
                        "shield",
                        cnPersonalUser(`shield-${active}`)
                    )}
                    onClick={closePopup}
                ></div>
                <div className={cnPersonalSettings("left")}>
                    <div className={cnPersonalUser("")}>
                        <div className={cnPersonalUser("photo")}>
                            {avatar && (
                                <img src={avatar} alt={store.lastname} />
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
                                    cnPersonalUser("label")
                                )}
                            >
                                <ReactSVG src={Gallery} />
                                <span>{"Изменить фото"}</span>
                            </label>
                            <div
                                className={cnPersonalUser(
                                    "change",
                                    cnPersonalUser(`change-${active}`)
                                )}
                            >
                                <div
                                    className={cnPersonalUser("current-photo")}
                                >
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
                                    {userTariff && userTariff.title}
                                </p>
                                <p
                                    className={cnTariffBlock("text")}
                                >{`Осталось ${store.loads_limit} репетиций`}</p>
                            </div>
                        </div>
                        <button
                            className={cnTariffBlock("btn")}
                            onClick={() => setModal(true)}
                        >
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
                                    <p
                                        className={cnArchiveTariff(
                                            "item-tariff"
                                        )}
                                    >
                                        {"Тариф"}
                                    </p>
                                    <p className={cnArchiveTariff("item-sum")}>
                                        {"Сумма"}
                                    </p>
                                    <p
                                        className={cnArchiveTariff(
                                            "item-period"
                                        )}
                                    >
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
            <ModalWindow isVisible={isModal} onClose={() => setModal(false)}>
                <div className={cnTariffBlock("modal-content")}>
                    <div className={cnTariffBlock("modal-header")}>
                        Продлите возможности персональных тренировок!
                    </div>
                    <div className={cnTariffBlock("modal-cards")}>
                        {basicTariffs &&
                            basicTariffs.map((el, index) => (
                                <TarifCard
                                    key={index}
                                    {...el}
                                    checked={checkedTarif === el.id}
                                    onClick={() => clickOnCard(el.id)}
                                />
                            ))}
                    </div>
                    <div className={cnTariffBlock("modal-footer")}>
                        <button
                            className={cnTariffBlock("modal-footer-btn", {
                                canClicked: checkedTarif !== "",
                            })}
                            onClick={clickOnButton}
                        >
                            Оплатить
                        </button>
                        <button
                            className={cnTariffBlock("modal-footer-btn-gray", {
                                canClicked: checkedTarif !== "",
                            })}
                            onClick={() => setModal(false)}
                        >
                            Выберу позже
                        </button>
                    </div>
                    <span className={cnTariffBlock("modal-span")}>
                        Обратите внимание, что при оплате выбранного тарифа, вы
                        не сможете прекратить его действие до использования всех
                        оплаченных попыток либо окончания указанного периода.
                    </span>
                </div>
            </ModalWindow>
        </>
    );
}
