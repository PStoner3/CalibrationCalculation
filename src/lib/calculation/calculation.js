function calculateMean(...means) {
    let retVal = 0;
    let sum = 0;

    means.forEach(function(mean) {
        sum += parseFloat(mean);
    });

    retVal = (sum / means.length).toPrecision(3);

    return retVal;
}

function calculateVariance(value, mean) {
    let retVal = 0;
    let difference = 0;
    let square = 0;

    difference = Math.abs(parseFloat(value) - mean);
    square = Math.pow(difference, 2)
    retVal = (square * 2).toPrecision(3);

    return retVal;
}

function calculateMeanTotal(...means) {
    let retVal = 0;
    let sum = 0;

    means.forEach(function(mean) {
        sum += parseFloat(mean);
    });

    retVal = (sum / means.length).toPrecision(3);

    return retVal;
}

function calculateVarianceWithIn(...variances) {
    let retVal = 0;
    let sum = 0;

    variances.forEach(function(v) {
        sum += parseFloat(v);
    });

    retVal = (sum / variances.length).toPrecision(3);

    return retVal;
}

function calculateVarianceMean(vWithIn, ...variances) {
    let retVal = 0;
    let sum = 0;

    variances.forEach(function(v) {
        sum += Math.pow((Math.abs(v - vWithIn)), 2);
    });

    return (sum / 2).toPrecision(2);
}

function calculateCVPercent(vWithin, mTotal) {

}

function calculateTotalPercent(vMean, vWithin, mTotal) {

}

module.exports = function calculateResults(data) {
    let results = new Object();

    results.run1Mean = calculateMean(data.run1Repl1, data.run1Repl2);
    results.run1Variance = calculateVariance(data.run1Repl1, results.run1Mean);

    results.run2Mean = calculateMean(data.run2Repl1, data.run2Repl2);
    results.run2Variance = calculateVariance(data.run2Repl1, results.run2Mean);

    results.run3Mean = calculateMean(data.run3Repl1, data.run3Repl2);
    results.run3Variance = calculateVariance(data.run3Repl1, results.run3Mean);

    results.Mtotal = calculateMeanTotal(results.run1Mean, results.run2Mean, results.run3Mean);
    results.Vwithin = calculateVarianceWithIn(results.run1Variance, results.run2Variance, results.run3Variance);
    results.Vmean = calculateVarianceMean(results.Vwithin, results.run1Variance, results.run2Variance, results.run3Variance);

    return results;
}