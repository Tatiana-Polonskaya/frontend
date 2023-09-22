interface IProps {
    component: string;
}

function Bubble3(props: IProps) {
    const colors = props.component;
    return (
        <>
            <svg
                width="154"
                height="185"
                viewBox="0 0 154 185"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="116.965"
                    cy="46.3401"
                    r="32.9875"
                    transform="rotate(-119.206 116.965 46.3401)"
                    fill={colors}
                    fillOpacity="0.6"
                />
                <circle
                    cx="20.4399"
                    cy="109.507"
                    r="20.3"
                    transform="rotate(-119.206 20.4399 109.507)"
                    fill={colors}
                />
                <circle
                    cx="58.8597"
                    cy="151.276"
                    r="32.9875"
                    transform="rotate(-119.206 58.8597 151.276)"
                    fill={colors}
                    fillOpacity="0.6"
                />
                <rect
                    x="9"
                    y="29"
                    width="145"
                    height="145"
                    rx="72.5"
                    fill={colors}
                />
                <circle
                    cx="142.689"
                    cy="37.4125"
                    r="10.8355"
                    transform="rotate(-85.4295 142.689 37.4125)"
                    fill={colors}
                />
                <circle
                    cx="20.4399"
                    cy="142.857"
                    r="20.3"
                    transform="rotate(-119.206 20.4399 142.857)"
                    fill={colors}
                />
            </svg>
        </>
    );
}

export default Bubble3;
