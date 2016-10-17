const { ipcRenderer: ipc } = require('electron');

document.getElementById('btnCalc').addEventListener('click', () => {
    console.log('Calculate button clicked');
    let data = new Object();
    data.run1Repl1 = document.getElementById('txtRepl1Run1').value;
    data.run1Repl2 = document.getElementById('txtRepl2Run1').value;

    data.run2Repl1 = document.getElementById('txtRepl1Run2').value;
    data.run2Repl2 = document.getElementById('txtRepl2Run2').value;

    data.run3Repl1 = document.getElementById('txtRepl1Run3').value;
    data.run3Repl2 = document.getElementById('txtRepl2Run3').value;

    console.log(data);
    ipc.send('doCalc', data);
})

ipc.on('calcResult', (event, results) => {
    document.getElementById('lblRun1Mean').innerHTML = results.run1Mean;
    document.getElementById('lblRun1Var').innerHTML = results.run1Variance;

    document.getElementById('lblRun2Mean').innerHTML = results.run2Mean;
    document.getElementById('lblRun2Var').innerHTML = results.run2Variance;

    document.getElementById('lblRun3Mean').innerHTML = results.run3Mean;
    document.getElementById('lblRun3Var').innerHTML = results.run3Variance;

    document.getElementById('lblMTot').innerHTML = results.Mtotal;
    document.getElementById('lblVWithin').innerHTML = results.Vwithin;
    document.getElementById('lblVMean').innerHTML = results.Vmean;

    document.getElementById('lblCVPercent').innerHTML = results.CVPercent;
    document.getElementById('lblTotalPercent').innerHTML = results.TotalPercent;

    ipc.send("logOutput", "Total Percent");
    ipc.send("logOutput", "VMean " + results.Vmean);
    ipc.send("logOutput", "VWithin " + results.Vwithin);
    ipc.send("logOutput", "MTotal " + results.Mtotal);
})