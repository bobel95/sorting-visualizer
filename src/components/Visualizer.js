import {useEffect, useState} from 'react';
import './Visualizer.css';
import normalizeValues from "../util/normalizeValues";

const Visualizer = () => {
    const [array, setArray] = useState([]);
    const [arrayLimits, setArrayLimits] = useState({"min": 1, "max": 500});

    const initializeArray = () => {
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(randomIntInRange(1, 500));
        }
        setArray(arr);

        const min = Math.min(...arr);
        const max = Math.max(...arr);
        setArrayLimits({"min": min, "max": max});
    }

    const randomIntInRange = (min, max) => Math.floor(
            Math.random() * (max - min + 1) + min
        );

    useEffect(initializeArray, []);
    console.log(arrayLimits);

    return (
        <div className="main-container">
            <div className="arr-container">
                {
                    array.map((value, i) => {
                        let barHeight = Math.ceil(
                            normalizeValues(value, arrayLimits.min, arrayLimits.max)
                        )

                        // If bar height is 0, set it to 1 to avoid invisible bars
                        if (!barHeight) barHeight = 1;

                        return (
                            <div
                                className="arr-element"
                                key={i}
                                style={{height: `${barHeight}%`}}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Visualizer;
