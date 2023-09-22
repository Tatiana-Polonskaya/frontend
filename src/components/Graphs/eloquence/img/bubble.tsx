interface IProps {
    component: string;
}

export default function Bubble(props: IProps) {
    const colors = props.component;
    return (
        <>
            <svg
                width="171"
                height="182"
                viewBox="0 0 171 182"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="37.5054"
                    cy="120.709"
                    r="32.9875"
                    transform="rotate(-85.4295 37.5054 120.709)"
                    fill={colors}
                />
                <circle
                    cx="130.486"
                    cy="51.9845"
                    r="23.6985"
                    transform="rotate(-85.4295 130.486 51.9845)"
                    fill={colors}
                />
                <circle
                    cx="31.6889"
                    cy="170.813"
                    r="10.8355"
                    transform="rotate(-85.4295 31.6889 170.813)"
                    fill={colors}
                />
                <circle
                    cx="137.613"
                    cy="128.687"
                    r="32.9875"
                    fill={colors}
                    fillOpacity="0.6"
                />
                <circle
                    cx="56.05"
                    cy="44.225"
                    r="20.3"
                    fill={colors}
                    fillOpacity="0.6"
                />
                <rect
                    x="14"
                    y="29"
                    width="145"
                    height="145"
                    rx="72.5"
                    fill={colors}
                />
                <circle
                    cx="33.2121"
                    cy="66.3376"
                    r="32.9875"
                    fill={colors}
                    fillOpacity="0.6"
                />
            </svg>
        </>
    );
}
