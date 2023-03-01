import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FixedPluginComponent } from './fixedplugin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
let FixedPluginModule = class FixedPluginModule {
};
FixedPluginModule = __decorate([
    NgModule({
        imports: [RouterModule, CommonModule, NgbModule],
        declarations: [FixedPluginComponent],
        exports: [FixedPluginComponent]
    })
], FixedPluginModule);
export { FixedPluginModule };
//# sourceMappingURL=fixedplugin.module.js.map