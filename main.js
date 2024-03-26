function AlignToGrid() {
    this.settings = {};
    this.settings_menuitemuuid = "";
    this.aligndevices_menuitemuuid = "";
    this.alignshapes_menuitemuuid = "";
    this.alignnotes_menuitemuuid = "";
}

AlignToGrid.prototype.init = function () {
    this.readSettings();

    var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();

    this.settings_menuitemuuid = menu.insertItem("", "AlignToGrid settings...");
    var menuItem = menu.getMenuItemByUuid(this.settings_menuitemuuid);
    menuItem.registerEvent("onClicked", this, this.settingsMenuClicked);

    this.aligndevices_menuitemuuid = menu.insertItem("", "Align devices to grid");
    var menuItem = menu.getMenuItemByUuid(this.aligndevices_menuitemuuid);
    menuItem.registerEvent("onClicked", this, this.alignDevicesMenuClicked);

    this.alignshapes_menuitemuuid = menu.insertItem("", "Align shapes to grid");
    var menuItem = menu.getMenuItemByUuid(this.alignshapes_menuitemuuid);
    menuItem.registerEvent("onClicked", this, this.alignShapesMenuClicked);

    this.alignnotes_menuitemuuid = menu.insertItem("", "Align notes to grid");
    var menuItem = menu.getMenuItemByUuid(this.alignnotes_menuitemuuid);
    menuItem.registerEvent("onClicked", this, this.alignNotesMenuClicked);
};

AlignToGrid.prototype.cleanUp = function () {
    var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();

    _ScriptModule.unregisterIpcEventByID("MenuItem", this.settings_menuitemuuid, "onClicked", this, this.settingsMenuClicked);
    menu.removeItemUuid(this.settings_menuitemuuid);
    this.settings_menuitemuuid = "";

    _ScriptModule.unregisterIpcEventByID("MenuItem", this.aligndevices_menuitemuuid, "onClicked", this, this.alignDevicesMenuClicked);
    menu.removeItemUuid(this.aligndevices_menuitemuuid);
    this.aligndevices_menuitemuuid = "";

    _ScriptModule.unregisterIpcEventByID("MenuItem", this.alignshapes_menuitemuuid, "onClicked", this, this.alignShapesMenuClicked);
    menu.removeItemUuid(this.alignshapes_menuitemuuid);
    this.alignshapes_menuitemuuid = "";

    _ScriptModule.unregisterIpcEventByID("MenuItem", this.alignnotes_menuitemuuid, "onClicked", this, this.alignNotesMenuClicked);
    menu.removeItemUuid(this.alignnotes_menuitemuuid);
    this.alignnotes_menuitemuuid = "";
};

AlignToGrid.prototype.settingsMenuClicked = function (src, args) {
    window.show();
};

AlignToGrid.prototype.alignDevicesMenuClicked = function (src, args) {
    alignDevices();
    alignClusters();
};

AlignToGrid.prototype.alignShapesMenuClicked = function (src, args) {
    alignShapes();
};

AlignToGrid.prototype.alignNotesMenuClicked = function (src, args) {
    alignNotes();
};

AlignToGrid.prototype.readSettings = function (src, args) {
    this.settings = JSON.parse($getData("settings.json"));
};

function alignDevices() {
    var gridSize = AlignToGrid.settings.devices.grid;
    var deviceCount = ipc.network().getDeviceCount();

    for (var i = 0; i < deviceCount; i++) {
        var device = ipc.network().getDeviceAt(i);

        var x = device.getCenterXCoordinate();
        var y = device.getCenterYCoordinate();

        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        device.moveToLocationCentered(x, y);
    }
}

function alignClusters() {
    var gridSize = AlignToGrid.settings.devices.grid;

    var lw = ipc.appWindow().getActiveWorkspace().getLogicalWorkspace();
    var clusterCount = lw.getCurrentCluster().getChildClusterCount();

    for (var c = 0; c < clusterCount; c++) {
        var cluster = lw.getCurrentCluster().getChildClusterAt(c);

        var x = cluster.getCenterXCoordinate();
        var y = cluster.getCenterYCoordinate();

        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        cluster.moveToLocationCentered(x, y);
    }
}

function alignShapes() {
    var gridSize = AlignToGrid.settings.shapes.grid;

    var lw = ipc.appWindow().getActiveWorkspace().getLogicalWorkspace();
    var canvasItemIds = lw.getCanvasItemIds();

    for (var canvasItemId of canvasItemIds) {
        var x = lw.getCanvasItemX(canvasItemId);
        var y = lw.getCanvasItemY(canvasItemId);

        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        lw.setCanvasItemX(canvasItemId, x);
        lw.setCanvasItemY(canvasItemId, y);
    }
}

function alignNotes() {
    var gridSize = AlignToGrid.settings.notes.grid;

    var lw = ipc.appWindow().getActiveWorkspace().getLogicalWorkspace();
    var noteIds = lw.getCanvasNoteIds();

    for (var noteId of noteIds) {
        var x = lw.getCanvasItemRealX(noteId);
        var y = lw.getCanvasItemRealY(noteId);

        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        lw.setCanvasItemRealPos(noteId, x, y);
    }
}

function main() {
    AlignToGrid = new AlignToGrid();
    AlignToGrid.init();
    window = new htmlWindow();
}

function cleanUp() {
    AlignToGrid.cleanUp();
}
