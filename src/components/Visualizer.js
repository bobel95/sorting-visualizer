import {useEffect, useState} from 'react';

const Visualizer = () => {
    const [array, setArray] = useState([]);

    const initializeArray = () => {
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(randomIntInRange(1, 1000));
        }
        setArray(arr);
    }

    const randomIntInRange = (min, max) => Math.floor(
            Math.random() * (max - min + 1) + min
        );

    useEffect(initializeArray, []);

    return (
        <div>
            {
                array.map((value, i) => (
                    <div className="arr-element" key={i}>
                        {value}
                    </div>
                ))

            }
        </div>
    );
};

export default Visualizer;
