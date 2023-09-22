import { cn } from "@bem-react/classname";
import "./style.scss";
import {
    DetailedHTMLProps,
    ForwardRefRenderFunction,
    InputHTMLAttributes,
    LegacyRef,
    ReactNode,
    forwardRef,
} from "react";

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

type Props = InputProps & {
    title?: string;
    handleOnChange: Function;
    isAnother?: boolean;
    children: ReactNode | ReactNode[];
    customref?: LegacyRef<HTMLInputElement>;
};

export default function CheckBoxItem(props: Props) {
    const cnCheckBoxItem = cn("CheckBoxItem");

    return (
        <div className={cnCheckBoxItem()}>
            {props.isAnother ? (
                <label className={cnCheckBoxItem("item-label")}>
                    <input
                        type="checkbox"
                        value={props.value}
                        className={cnCheckBoxItem("item-check")}
                        checked={props.checked}
                        onChange={() => props.handleOnChange()}
                    />
                    <div className={cnCheckBoxItem("item-span-another")}>
                        Другое:
                    </div>
                    <input
                        type="text"
                        placeholder={props.title}
                        className={cnCheckBoxItem("item-input-text")}
                        disabled={!props.checked}
                        ref={props.customref}
                        // onChange={changeAnotherAnswer}
                    />
                </label>
            ) : (
                <label className={cnCheckBoxItem("item-label")}>
                    <input
                        type="checkbox"
                        id={`checkbox-item-${props.id}`}
                        value={props.value}
                        name={props.name}
                        checked={props.checked}
                        onChange={() => props.handleOnChange()}
                        className={cnCheckBoxItem("item-check")}
                        disabled={props.disabled ? props.disabled : false}
                    />
                    <span className={cnCheckBoxItem("item-span")}>
                        {props.children}
                    </span>
                </label>
            )}
        </div>
    );
}

const ForwardedCheckBoxItemFunc: ForwardRefRenderFunction<
    HTMLInputElement,
    Props
> = (props, ref) => <CheckBoxItem customref={ref} {...props} />;

export const ForwardedCheckBoxItem = forwardRef(ForwardedCheckBoxItemFunc);
