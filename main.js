function AlignToGrid() {
    this.m_menuitemuuid = "";
}

AlignToGrid.prototype.init = function () {
    var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();
    this.m_menuitemuuid = menu.insertItem("", "Align devices to grid");
    var menuItem = menu.getMenuItemByUuid(this.m_menuitemuuid);
    menuItem.registerEvent("onClicked", this, this.menuClicked);
};

AlignToGrid.prototype.cleanUp = function () {
    if (this.m_menuitemuuid != "") {
        var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();
        _ScriptModule.unregisterIpcEventByID("MenuItem", this.m_menuitemuuid, "onClicked", this, this.menuClicked);
        menu.removeItemUuid(this.m_menuitemuuid);
        this.m_menuitemuuid = "";
    }
};

AlignToGrid.prototype.menuClicked = function (src, args) {
    alignDevices();
};

function alignDevices() {
    var gridSize = 100;

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

function main() {
    AlignToGrid = new AlignToGrid();
    AlignToGrid.init();
}

function cleanUp() {
    AlignToGrid.cleanUp();
}
