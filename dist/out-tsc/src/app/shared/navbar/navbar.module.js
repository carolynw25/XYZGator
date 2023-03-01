import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
let NavbarModule = class NavbarModule {
};
NavbarModule = __decorate([
    NgModule({
        imports: [RouterModule, CommonModule, NgbModule],
        declarations: [NavbarComponent],
        exports: [NavbarComponent]
    })
], NavbarModule);
export { NavbarModule };
//# sourceMappingURL=navbar.module.js.map