let min = 1;
let max = 500;

function saveClicked() {
    settingsObj = { devices: { grid: 100 }, shapes: { grid: 50 }, notes: { grid: 15 } };

    let devicesGrid = Number(document.getElementById("devicesGridInput").value);
    if (devicesGrid >= min && devicesGrid <= max) settingsObj.devices.grid = devicesGrid;

    let shapesGrid = document.getElementById("shapesGridInput").value;
    if (shapesGrid >= min && shapesGrid <= max) settingsObj.shapes.grid = shapesGrid;

    let notesGrid = document.getElementById("notesGridInput").value;
    if (notesGrid >= min && notesGrid <= max) settingsObj.notes.grid = notesGrid;

    settingsJson = JSON.stringify(settingsObj);

    $putData("settings.json", settingsJson);

    $se("window.close");
}

function cancelClicked() {
    $se("window.close");
}

function loaded() {
    $getData("settings.json").then((settingsJson) => {
        settingsObj = JSON.parse(settingsJson);
        document.getElementById("devicesGridInput").value = settingsObj.devices.grid;
        document.getElementById("shapesGridInput").value = settingsObj.shapes.grid;
        document.getElementById("notesGridInput").value = settingsObj.notes.grid;
    });
}
