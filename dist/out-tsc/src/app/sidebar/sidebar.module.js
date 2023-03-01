import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
let SidebarModule = class SidebarModule {
};
SidebarModule = __decorate([
    NgModule({
        imports: [RouterModule, CommonModule],
        declarations: [SidebarComponent],
        exports: [SidebarComponent]
    })
], SidebarModule);
export { SidebarModule };
//# sourceMappingURL=sidebar.module.js.map