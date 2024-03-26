function htmlWindow() {
    var webview;
    var webviewId;
}

htmlWindow.prototype.init = function () {};

htmlWindow.prototype.cleanUp = function () {
    this.webview.unregisterEvent("closed", this, this.windowClosed);
};

htmlWindow.prototype.show = function () {
    if (webViewManager.getWebView(this.webviewId) == null) {
        this.webview = webViewManager.createWebView("AlignToGrid Settings", "this-sm:index.html", 440, 180);
        this.webviewId = this.webview.getWebViewId();
        this.webview.registerEvent("closed", this, this.windowClosed);
        this.webview.setWindowFlags(0x00000102);
    }

    this.webview.hide();
    this.webview.show();
};

htmlWindow.prototype.close = function () {
	AlignToGrid.readSettings();
    this.webview.close();
};

htmlWindow.prototype.windowClosed = function (src, args) {
    this.webviewId = "";
    this.webview.unregisterEvent("closed", this, this.windowClosed);
};
