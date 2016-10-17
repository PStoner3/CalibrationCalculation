function calculateMean(...means) {
    let retVal = 0;
    let sum = 0;

    means.forEach(function(mean) {
        sum += parseFloat(mean);
    });

    retVal = (sum / means.length).toPrecision(3);

    return retVal;
}

function calculateVariance(value, ...means) {
    let retVal = 0;
    let sum = 0;

    means.forEach(function(m) {
        sum += Math.pow(Math.abs(m - value), 2);
    })

    return (sum.toPrecision(3) / (means.length - 1)).toPrecision(3);;
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

function calculateCVPercent(vWithin, mTotal) {
    return (100 * ((Math.sqrt(vWithin)) / mTotal)).toPrecision(2);
}

function calculateTotalPercent(vMean, vWithin, mTotal) {
    return (100 * (Math.sqrt((parseFloat(vMean) + (0.5 * vWithin))) / mTotal)).toPrecision(2);
}

module.exports = function calculateResults(data) {
    let results = new Object();

    results.run1Mean = calculateMean(data.run1Repl1, data.run1Repl2);
    results.run1Variance = calculateVariance(results.run1Mean, data.run1Repl1, data.run1Repl2);

    results.run2Mean = calculateMean(data.run2Repl1, data.run2Repl2);
    results.run2Variance = calculateVariance(results.run2Mean, data.run2Repl1, data.run2Repl2);

    results.run3Mean = calculateMean(data.run3Repl1, data.run3Repl2);
    results.run3Variance = calculateVariance(results.run3Mean, data.run3Repl1, data.run3Repl2);

    results.Mtotal = calculateMean(results.run1Mean, results.run2Mean, results.run3Mean);
    results.Vwithin = calculateVarianceWithIn(results.run1Variance, results.run2Variance, results.run3Variance);
    results.Vmean = calculateVariance(results.Mtotal, results.run1Mean, results.run2Mean, results.run3Mean);

    results.CVPercent = calculateCVPercent(results.Vwithin, results.Mtotal);
    results.TotalPercent = calculateTotalPercent(results.Vmean, results.Vwithin, results.Mtotal);

    return results;
}