const normalizeValues = (value, min, max) => {
    return (value - min) / (max - min) * 100;
}

export default normalizeValues;