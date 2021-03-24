const getQuickSortAnimations = array => {
    const copy = [...array];
    const animations = [];
    quickSort(copy, 0, array.length - 1, animations);
    return animations;
}

const quickSort = (array, left, right, animations) => {
    if (right <= left) { return; }

    const pivotIndex = partition(array, left, right, animations);
    quickSort(array, left, pivotIndex - 1, animations);
    quickSort(array, pivotIndex + 1, right, animations);

}

const partition = (array, left, right, animations) => {
    let pivot = array[left];

    let i = left + 1;
    let j = right;

    while (j > i) {
        while (i <= j && array[i] <= pivot) {
            animations.push([[i], false]);
            i++;
        }

        while (i <= j && array[j] > pivot) {
            animations.push([[j], false]);
            j--;
        }

        if (j > i) {
            animations.push([[j, array[i]], true]);
            animations.push([[i, array[j]], true]);

            const temp = array[j];
            array[j] = array[i];
            array[i] = temp;
        }
    }

    while (j > left && array[j] >= pivot) {
        j--;
    }

    animations.push([[left, array[j]], true]);
    animations.push([[j, array[left]], true]);

    const temp = array[left];
    array[left] = array[j];
    array[j] = temp;

    return j;
}

export default getQuickSortAnimations;