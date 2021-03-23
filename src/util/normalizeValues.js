/**
 * Normalize a number between a provided min and max
 *
 * @param value      - the value that is normalized
 * @param arrMin     - the smallest number of the initial range of non-normalized numbers
 * @param arrMax     - the largest number of the initial range of non-normalized numbers
 * @param start      - the smallest value possible after normalization
 * @param end        - the largest value possible after normalization
 * @returns {number} - normalized number
 */
const normalizeValues = (value, arrMin, arrMax, start, end) => {

    const width = end - start;
    return width * ((value - arrMin) / (arrMax - arrMin)) + start;
}

export default normalizeValues;