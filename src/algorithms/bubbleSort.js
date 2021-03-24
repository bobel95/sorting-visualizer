const getBubbleSortAnimation = arr => {
    const arrCopy = [...arr];
    const animations = [];

    for (let i = 1; i < arrCopy.length; i++) {
        for (let j = 0; j < arrCopy.length - i; j++) {

            animations.push([[j, j + 1], false]);

            if (arrCopy[j] > arrCopy[j + 1]) {

                animations.push([[j, arrCopy[j + 1]], true]);
                animations.push([[j + 1, arrCopy[j]], true]);

                const temp = arrCopy[j];
                arrCopy[j] = arrCopy[j + 1];
                arrCopy[j + 1] = temp;
            }
        }
    }

    return animations;
}

export default getBubbleSortAnimation;