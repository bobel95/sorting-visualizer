const getInsertionSortAnimations = (arr) => {
    const arrCopy = [...arr];
    const len = arrCopy.length;
    const animations = [];

    for (let i = 0; i < len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            animations.push([[j, j + 1], false]);

            if (arrCopy[j + 1] >= arrCopy[j]) {
                break;
            }

            animations.push([[j, arrCopy[j + 1]], true]);
            animations.push([[j + 1, arrCopy[j]], true]);

            let temp = arrCopy[j];
            arrCopy[j] = arrCopy[j + 1];
            arrCopy[j + 1] = temp;
        }
    }

    return animations;
}

export default getInsertionSortAnimations;