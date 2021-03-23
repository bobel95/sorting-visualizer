import {useEffect, useState} from 'react';
import './Visualizer.css';
import normalizeValues from "../util/normalizeValues";
import getInsertionSortAnimations from "../algorithms/insertionSort";
import getBubbleSortAnimation from "../algorithms/bubbleSort";
import {Button} from 'react-bootstrap';

const ANIMATION_DELAY = 5;
const NUM_OF_ARR_ELEMENTS = 50;
const SORTED_ARRAY_COLOR = 'green';
const COMPARED_BARS_COLOR = 'blue';


const Visualizer = () => {
    const [array, setArray] = useState([]);
    const [arrayLimits, setArrayLimits] = useState({"min": 1, "max": 500});
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    const initializeArray = () => {
        if (isSorting) return;
        if (isSorted) resetArrayColor();

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

    const animateBubbleSort = () => {
        const animations = getBubbleSortAnimation(array);
        animateArray(animations);
        // console.log(animations);
    }

    const animateArray = animations => {
        if (isSorting) return;

        setIsSorting(true);

        animations.forEach( ([comparation, didSwap], idx) => {
            setTimeout(() => {
                if (!didSwap) {
                    if (comparation.length === 2) {
                        const [i, j] = comparation;
                        animateArrayAccess(i);
                        animateArrayAccess(j);
                    } else {
                        const [i] = comparation;
                        animateArrayAccess(i);
                    }
                } else {
                    setArray( prevArr => {
                        const [k, newVal] = comparation;
                        const newArr = [...prevArr];
                        newArr[k] = newVal;
                        return newArr;
                    })
                }
            }, idx * ANIMATION_DELAY)
        });

        setTimeout(() => {
            animateArrayIsSorted();
        }, animations.length * ANIMATION_DELAY * 1.01);
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
        arrBars.forEach((bar, idx) => {
            setTimeout(() => {
                bar.style.backgroundColor = SORTED_ARRAY_COLOR;
            }, idx * ANIMATION_DELAY )
        })

        setTimeout(() => {
            setIsSorted(true);
            setIsSorting(false);
        }, arrBars.length * ANIMATION_DELAY);
    }

    const resetArrayColor = () => {
        const arrBars = document.querySelectorAll(".arr-element");
        arrBars.forEach(bar => bar.style.backgroundColor = 'gray');
    }

    return (
        <div className="main-container">
            <div className="arr-container">
                {
                    array.map((value, i) => {
                        let barHeight = normalizeValues(
                            value,
                            arrayLimits.min,
                            arrayLimits.max,
                            1,
                            100
                        )

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

            <Button
                variant="primary"
                onClick={animateBubbleSort}>
                Bubble Sort
            </Button>
        </div>
    );
};

export default Visualizer;
