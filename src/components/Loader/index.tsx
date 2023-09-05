import { cn } from "@bem-react/classname";
import lottie from "lottie-web";
import { useRef, useEffect } from "react";
import "./style.scss";

export default function LoaderLogo() {
    const cnLogoAnimation = cn("LoaderLogo");
    const AnimationContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: AnimationContainer.current!,
            renderer: "svg", // Вы можете выбрать другой рендерер, если нужно
            loop: true,
            autoplay: true,
            animationData: require("./preloader.json"), // Замените путь на путь к вашему файлу анимации JSON
        });

        return () => {
            animation.destroy(); // Опционально, если вы хотите удалить анимацию при размонтировании компонента
        };
    }, []);

    return (
        <div className={cnLogoAnimation()}>
            <div
                ref={AnimationContainer}
                className={cnLogoAnimation("animation")}
            ></div>
        </div>
    );
}
