function AlignToGrid() {
    this.aligndevices_menuitemuuid = "";
    this.alignshapes_menuitemuuid = "";
}

AlignToGrid.prototype.init = function () {
    var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();

    this.aligndevices_menuitemuuid = menu.insertItem("", "Align devices to grid");
    var menuItem = menu.getMenuItemByUuid(this.aligndevices_menuitemuuid);
    menuItem.registerEvent("onClicked", this, this.alignDevicesMenuClicked);

    this.alignshapes_menuitemuuid = menu.insertItem("", "Align shapes to grid");
    var menuItem = menu.getMenuItemByUuid(this.alignshapes_menuitemuuid);
    menuItem.registerEvent("onClicked", this, this.alignShapesMenuClicked);
};

AlignToGrid.prototype.cleanUp = function () {
    if (this.aligndevices_menuitemuuid != "") {
        var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();
        
        _ScriptModule.unregisterIpcEventByID("MenuItem", this.aligndevices_menuitemuuid, "onClicked", this, this.alignDevicesMenuClicked);
        menu.removeItemUuid(this.aligndevices_menuitemuuid);
        this.aligndevices_menuitemuuid = "";

        _ScriptModule.unregisterIpcEventByID("MenuItem", this.alignshapes_menuitemuuid, "onClicked", this, this.alignShapesMenuClicked);
        menu.removeItemUuid(this.alignshapes_menuitemuuid);
        this.alignshapes_menuitemuuid = "";
    }
};

AlignToGrid.prototype.alignDevicesMenuClicked = function (src, args) {
    alignDevices();
};

AlignToGrid.prototype.alignShapesMenuClicked = function (src, args) {
    alignShapes();
};

function alignDevices(gridSize = 100) {
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

function alignShapes(gridSize = 50) {
    var lw = ipc.appWindow().getActiveWorkspace().getLogicalWorkspace();
    // var deviceCount = ipc.network().getDeviceCount();
    var canvasItemIds = lw.getCanvasItemIds();

    for (var canvasItemId of canvasItemIds) {
        var x = lw.getCanvasItemX(canvasItemId);
        var y = lw.getCanvasItemY(canvasItemId);

        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        // device.moveToLocationCentered(x, y);
        lw.setCanvasItemX(canvasItemId, x);
        lw.setCanvasItemY(canvasItemId, y);
    }
}

function main() {
    AlignToGrid = new AlignToGrid();
    AlignToGrid.init();
}

function cleanUp() {
    AlignToGrid.cleanUp();
}
