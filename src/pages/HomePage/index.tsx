import Carousel from "../../components/Сarousel";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState, useCallback } from "react";


function StateComponent() {
    const [counter, setCounter] = useState(0)

    const increment = () => setCounter(prev => ++prev)

    return (
        <div>
            <span>{counter}</span>
            <button onClick={increment}>Incement</button>
        </div>
    )
}

function EffectComponent() {

    useEffect(() => console.log("did mount"), [])
    useEffect(() => () => console.log("destroy"), [])
    useEffect(() => console.log("always"))
    const [counter, setCounter] = useState(0)

    useEffect(() => console.log(2), [counter]) // для useState counter

    const increment = () => setCounter(prev => ++prev)

    return (
        <div>
            <span>{counter}</span>
            <button onClick={increment}>Incement</button>
        </div>
    )
}



export default function HomePage() {

    const [hasEffectComponent, setEffectComponent] = useState(true)
    return <MainLayout>
        <StateComponent />
        {hasEffectComponent && <EffectComponent />}
        <button onClick={() => setEffectComponent(prev => !prev)}>toggle</button>
        <Carousel />
    </MainLayout>;
}
