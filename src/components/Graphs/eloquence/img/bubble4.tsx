interface IProps {
    component: string;
}

function Bubble4(props: IProps) {
    const colors = props.component;
    return (
        <>
            <svg
                width="183"
                height="184"
                viewBox="0 0 183 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="33.4014"
                    cy="101.695"
                    r="32.9875"
                    transform="rotate(86.9403 33.4014 101.695)"
                    fill={colors}
                    fillOpacity="0.6"
                />
                <circle
                    cx="154.408"
                    cy="86.0765"
                    r="20.3"
                    transform="rotate(86.9403 154.408 86.0765)"
                    fill={colors}
                />
                <rect
                    x="19"
                    y="10"
                    width="145"
                    height="145"
                    rx="72.5"
                    fill={colors}
                />
                <circle
                    cx="162.58"
                    cy="57.589"
                    r="20.3"
                    transform="rotate(86.9403 162.58 57.589)"
                    fill={colors}
                />
                <circle
                    cx="131.802"
                    cy="33.1012"
                    r="32.9875"
                    transform="rotate(86.9403 131.802 33.1012)"
                    fill={colors}
                    fillOpacity="0.6"
                />
                <circle
                    cx="81.6391"
                    cy="167.037"
                    r="10.8355"
                    transform="rotate(-85.4295 81.6391 167.037)"
                    fill={colors}
                />
            </svg>
        </>
    );
}

export default Bubble4;
