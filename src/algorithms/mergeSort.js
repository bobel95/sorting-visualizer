const getMergeSortAnimation = array => {

    const auxArr = [...array];
    const animations = [];
    mergeSort(array, auxArr, 0, array.length - 1, animations);

    return animations;
}

const mergeSort = (array, auxArr, left, right, animations) => {
    if (left === right) {return;}

    const middle = Math.floor((left + right) / 2);

    mergeSort(auxArr, array, left, middle, animations);
    mergeSort(auxArr, array, middle + 1, right, animations);

    merge(array, auxArr, left, middle, right, animations);
}

const merge = (arr, auxArr, left, middle, right, animations) => {

    let k = left;
    let i = left;
    let j = middle + 1;

    while (i <= middle && j <= right) {
        // animations.push([i, j], false);
        if (auxArr[i] <= auxArr[j]) {
            animations.push([[i, j], false]);
            animations.push([[k, auxArr[i]], true]);
            arr[k++] = auxArr[i++];
        } else {
            animations.push([[i, j], false]);
            animations.push([[k, auxArr[j]], true]);
            arr[k++] = auxArr[j++];
        }
    }

    while (i <= middle) {
        animations.push([[i], false]);
        animations.push([[k, auxArr[i]], true]);
        arr[k++] = auxArr[i++];
    }

    while (j <= right) {
        animations.push([[j], false]);
        animations.push([[k, auxArr[j]], true]);
        arr[k++] = auxArr[j++];
    }

    // const merged = [];
    //
    // let [i, j] = [0, 0];
    //
    // while (i < arr1.length && j < arr2.length) {
    //     if (arr1[i] < arr2[j]) {
    //         merged.push(arr1[i++]);
    //     } else {
    //         merged.push(arr2[j++]);
    //     }
    // }
    //
    // while (i < arr1.length) {
    //     merged.push(arr1[i++]);
    // }
    //
    // while (j < arr2.length) {
    //     merged.push(arr2[j++]);
    // }
    //
    // return merged;
}

export default getMergeSortAnimation;
