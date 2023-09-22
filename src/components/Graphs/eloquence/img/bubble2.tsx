interface IProps {
    component: string;
}

function Bubble2(props: IProps) {
    const colors = props.component;

    return (
        <>
            <svg
                width="168"
                height="184"
                viewBox="0 0 168 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <ellipse
                    cx="33.7851"
                    cy="62.9072"
                    rx="32.9875"
                    ry="32.9875"
                    transform="rotate(-30.9751 33.7851 62.9072)"
                    fill={colors}
                />
                <ellipse
                    cx="48.2841"
                    cy="33.9075"
                    rx="32.9875"
                    ry="32.9875"
                    transform="rotate(-30.9751 48.2841 33.9075)"
                    fill={colors}
                    fillOpacity="0.6"
                />
                <ellipse
                    cx="143.757"
                    cy="98.6084"
                    rx="23.6985"
                    ry="23.6985"
                    transform="rotate(-30.9751 143.757 98.6084)"
                    fill={colors}
                />
                <rect
                    x="11"
                    y="10"
                    width="145"
                    height="145"
                    rx="72.5"
                    fill={colors}
                />
                <ellipse
                    cx="144.69"
                    cy="144.562"
                    rx="10.8355"
                    ry="10.8355"
                    transform="rotate(-85.4295 144.69 144.562)"
                    fill={colors}
                />
                <ellipse
                    cx="142.219"
                    cy="75.7655"
                    rx="19.211"
                    ry="19.211"
                    transform="rotate(-30.9751 142.219 75.7655)"
                    fill={colors}
                    fillOpacity="0.6"
                />
            </svg>
        </>
    );
}

export default Bubble2;
