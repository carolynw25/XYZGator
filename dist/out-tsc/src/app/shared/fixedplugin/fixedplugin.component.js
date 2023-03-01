import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FixedPluginComponent = class FixedPluginComponent {
    constructor() {
        this.sidebarColor = "white";
        this.sidebarActiveColor = "danger";
        this.state = true;
    }
    changeSidebarColor(color) {
        var sidebar = document.querySelector('.sidebar');
        this.sidebarColor = color;
        if (sidebar != undefined) {
            sidebar.setAttribute('data-color', color);
        }
    }
    changeSidebarActiveColor(color) {
        var sidebar = document.querySelector('.sidebar');
        this.sidebarActiveColor = color;
        if (sidebar != undefined) {
            sidebar.setAttribute('data-active-color', color);
        }
    }
    ngOnInit() { }
};
FixedPluginComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'fixedplugin-cmp',
        templateUrl: 'fixedplugin.component.html'
    })
], FixedPluginComponent);
export { FixedPluginComponent };
//# sourceMappingURL=fixedplugin.component.js.map