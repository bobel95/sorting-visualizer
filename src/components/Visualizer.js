import {useEffect, useState} from 'react';
import './Visualizer.css';
import normalizeValues from "../util/normalizeValues";
import getInsertionSortAnimations from "../algorithms/insertionSort";
import {Button} from 'react-bootstrap';

const ANIMATION_DELAY = 7;
const NUM_OF_ARR_ELEMENTS = 100;
const SORTED_ARRAY_COLOR = 'green';
const COMPARED_BARS_COLOR = 'blue';


const Visualizer = () => {
    const [array, setArray] = useState([]);
    const [arrayLimits, setArrayLimits] = useState({"min": 1, "max": 500});
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    const initializeArray = () => {
        if (isSorting) return;

        setIsSorted(false);
        const arr = [];
        for (let i = 0; i < NUM_OF_ARR_ELEMENTS; i++) {
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

    const animateInsertionSort = () => {
        const animations = getInsertionSortAnimations(array);
        animateArray(animations);
    }

    const animateArray = animations => {
        if (isSorting) return;

        setIsSorting(true);

        animations.forEach( ([indexesCompared, didSwap], idx) => {
            setTimeout(() => {
                if (!didSwap) {
                    if (indexesCompared.length === 2) {
                        const [i, j] = indexesCompared;
                        animateArrayAccess(i);
                        animateArrayAccess(j);
                    } else {
                        const [i] = indexesCompared;
                        animateArrayAccess(i);
                    }
                } else {
                    setArray( prevArr => {
                        const [k, newVal] = indexesCompared;
                        const newArr = [...prevArr];
                        newArr[k] = newVal;
                        return newArr;
                    })
                }
            }, idx * ANIMATION_DELAY)
        });
        setTimeout(() => {
            animateArrayIsSorted();
        }, animations.length * ANIMATION_DELAY);
    }

    const animateArrayAccess = idx => {
        const arrBars = document.querySelectorAll(".arr-element");
        setTimeout(() => {
            arrBars[idx].style.backgroundColor = COMPARED_BARS_COLOR;
        }, ANIMATION_DELAY)

        setTimeout(() => {
            arrBars[idx].style.backgroundColor = '';
        }, ANIMATION_DELAY * 2)
    }

    const animateArrayIsSorted = () => {
        const arrBars = document.querySelectorAll(".arr-element");
        for (let i = 0; i < arrBars.length; i++) {
            setTimeout(() => {
                arrBars[i].style.backgroundColor = SORTED_ARRAY_COLOR;
            }, i * ANIMATION_DELAY);
        }

        setTimeout(() => {
            setIsSorted(true);
            setIsSorting(false);
        }, arrBars.length * ANIMATION_DELAY);
    }

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
            <Button
                variant="primary"
                onClick={initializeArray}>
                Generate Array
            </Button>
            <Button
                variant="primary"
                onClick={animateInsertionSort}>
                Insertion Sort
            </Button>
        </div>
    );
};

export default Visualizer;
