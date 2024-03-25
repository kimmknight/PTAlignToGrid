function AlignToGrid() {
    this.aligndevices_menuitemuuid = "";
    this.alignshapes_menuitemuuid = "";
    this.alignnotes_menuitemuuid = "";
}

AlignToGrid.prototype.init = function () {
    var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();

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
    if (this.aligndevices_menuitemuuid != "") {
        var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();
        
        _ScriptModule.unregisterIpcEventByID("MenuItem", this.aligndevices_menuitemuuid, "onClicked", this, this.alignDevicesMenuClicked);
        menu.removeItemUuid(this.aligndevices_menuitemuuid);
        this.aligndevices_menuitemuuid = "";

        _ScriptModule.unregisterIpcEventByID("MenuItem", this.alignshapes_menuitemuuid, "onClicked", this, this.alignShapesMenuClicked);
        menu.removeItemUuid(this.alignshapes_menuitemuuid);
        this.alignshapes_menuitemuuid = "";
        
        _ScriptModule.unregisterIpcEventByID("MenuItem", this.alignnotes_menuitemuuid, "onClicked", this, this.alignNotesMenuClicked);
        menu.removeItemUuid(this.alignnotes_menuitemuuid);
        this.alignnotes_menuitemuuid = "";
    }
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


function alignClusters(gridSize = 100) {
    var lw = ipc.appWindow().getActiveWorkspace().getLogicalWorkspace();
    var clusterCount = lw.getCurrentCluster().getChildClusterCount();
    
    for (var c = 0; c < clusterCount; c++) {
        var cluster = lw.getCurrentCluster().getChildClusterAt(c);
        
        var x = cluster.getCenterXCoordinate();
        var y = cluster.getCenterYCoordinate();
        
        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;
        
        cluster.moveToLocationCentered(x, y)
    }
}

function alignShapes(gridSize = 50) {
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

function alignNotes(gridSize = 15) {
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
}

function cleanUp() {
    AlignToGrid.cleanUp();
}
