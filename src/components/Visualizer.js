import React, {useEffect, useState} from 'react';
import './Visualizer.css';
import normalizeValues from "../util/normalizeValues";
import getInsertionSortAnimations from "../algorithms/insertionSort";
import getBubbleSortAnimation from "../algorithms/bubbleSort";
import getMergeSortAnimation from "../algorithms/mergeSort";
import getQuickSortAnimations from "../algorithms/quickSort";
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import PageTitle from "../layout/PageTitle";
import InputSlider from "./InputSlider";

const ANIMATION_DELAY = 5;
const NUM_OF_ARR_ELEMENTS = 100;
const MAX_VAL_OF_ARRAY_ELEMENT = 500;
const SORTED_ARRAY_COLOR = '#8ee820';
const COMPARED_BARS_COLOR = '#52fff1';


const Visualizer = () => {
    const [numOfArrElements, setNumOfArrElements] = useState(NUM_OF_ARR_ELEMENTS);
    const [array, setArray] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");
    const [arrayLimits, setArrayLimits] = useState({"min": 1, "max": MAX_VAL_OF_ARRAY_ELEMENT});
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    const initializeArray = () => {
        if (isSorting) return;
        if (isSorted) resetArrayColor();

        setIsSorted(false);
        const arr = [];
        for (let i = 0; i < numOfArrElements; i++) {
            arr.push(randomIntInRange(1, MAX_VAL_OF_ARRAY_ELEMENT));
        }
        setArray(arr);

        const min = Math.min(...arr);
        const max = Math.max(...arr);
        setArrayLimits({"min": min, "max": max});
    }

    const randomIntInRange = (min, max) => Math.floor(
            Math.random() * (max - min + 1) + min
        );

    useEffect(initializeArray, [numOfArrElements]);

    const animateSort = () => {
        if (selectedSort) {
            const animationData = getSortingAnimations(selectedSort);
            animateArray(animationData);
        }

    }

    const getSortingAnimations = (sortType) => {
        switch (sortType) {
            case "insertion":
                return getInsertionSortAnimations(array);
            case "bubble":
                return getBubbleSortAnimation(array);
            case "merge":
                return getMergeSortAnimation(array);
            case "quick":
                return getQuickSortAnimations(array);
            default:
                return [];
        }
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
        arrBars.forEach(bar => bar.style.backgroundColor = '#c3c3c3');
    }

    return (
        <Container fluid>
            <Row style={{height: "100vh"}}>

                <Col
                    md="3"
                    style={{border: "2px solid green"}}
                    id="left-side-container"
                >
                    <Row>
                        <PageTitle/>
                    </Row>
                    <Row className="controls-container">

                        <div className="controls-element">
                            <h5 className="form-label">
                                Generate a new array
                            </h5>
                            <Button
                                className="btn-main"
                                variant="primary"
                                onClick={initializeArray}>
                                Generate Array
                            </Button>
                        </div>

                        <hr/>
                        <Form className="controls-element">
                            <h5 className="form-label">
                                Select a sorting algorithm
                            </h5>

                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="algorithm"
                                custom
                                onChange={e => setSelectedSort(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="insertion">Insertion Sort</option>
                                <option value="bubble">Bubble Sort</option>
                                <option value="quick">Quick Sort</option>
                                <option value="merge">Merge Sort</option>

                            </Form.Control>
                        </Form>

                        <hr/>

                        <div className="controls-element">
                            <h5 className="form-label">
                                Number of array elements
                            </h5>
                            <InputSlider
                                value={numOfArrElements}
                                setValue={setNumOfArrElements}
                                min={10}
                                max={100}
                            />
                        </div>

                    </Row>

                    <Row id="sort-btn-container">
                        <Button
                            className="btn-main"
                            variant="success"
                            onClick={animateSort}
                            id="sort-btn">
                            Sort
                        </Button>
                    </Row>
                </Col>
                <Col
                    md="9"
                    style={{border: "2px solid blue"}}
                    id="right-side-container"
                >
                    <div className="visualization-container">
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
                    </div>
                </Col>
            </Row>
        </Container>

    );
};

export default Visualizer;
