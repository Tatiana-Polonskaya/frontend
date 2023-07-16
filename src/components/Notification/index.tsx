import { cn } from "@bem-react/classname";
import HeaderNotification from "./-Header";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import NotificationItem, { TYPE_NOTIFICATION } from "./-NotificationItem";

import "./style.scss";

export const NotificationContext = createContext({
    isShow: true,
    setIsShow: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

export default function Notification() {
    const cnNotification = cn("Notification");

    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <NotificationContext.Provider value={{ isShow, setIsShow }}>
                <div className={cnNotification({ expanded: isShow })}>
                    <HeaderNotification />

                    {isShow && (
                        <div
                            className={cnNotification("content", {
                                expanded: !isShow,
                            })}
                        >
                            <div className={cnNotification("content-date")}>
                                Сегодня
                            </div>
                            <NotificationItem
                                title="Взгляните на свой прогресс!"
                                description="В Дневнике обновилась статистика, пора узнать результат!"
                                type={TYPE_NOTIFICATION.NOTICE}
                                status={true}
                                linkTitle=""
                            />
                            <div className={cnNotification("content-date")}>
                                Вчера
                            </div>
                            <NotificationItem
                                title="У вас заканчиваются репетиции!"
                                description="Осталось всего 2 репетиции. Выберите тариф, чтобы продолжить совершенствовать свои навыки."
                                type={TYPE_NOTIFICATION.LINK}
                                status={false}
                                linkTitle="Выбрать тариф"
                            />
                        </div>
                    )}
                </div>
            </NotificationContext.Provider>
        </>
    );
}
