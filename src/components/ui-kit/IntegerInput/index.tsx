type IntegerInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export default function IntegerInput(props: IntegerInputProps) {
    function validateNumber(value: any) {
        return !isNaN(Number(value));
    }

    function validateInput(event: React.KeyboardEvent<HTMLInputElement>) {
        const keyInList = (key: string) =>
            ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key);

        const keyIsModifier = (event: React.KeyboardEvent<HTMLInputElement>) =>
            event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;

        if (
            !(
                keyIsModifier(event) ||
                keyInList(event.key) ||
                validateNumber(event.key)
            )
        ) {
            event.preventDefault();
        }
    }

    return (
        <input
            {...props}
            onKeyDown={(event) => {
                validateInput(event);
                props.onKeyDown && props.onKeyDown(event);
            }}
            onPaste={(event) => {
                !validateNumber(event.clipboardData.getData("Text")) &&
                    event.preventDefault();
            }}
        />
    );
}
