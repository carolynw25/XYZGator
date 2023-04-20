import { __decorate } from "tslib";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./service/restapi.service";
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            AdminLayoutComponent,
            LoginComponent,
            SignupComponent,
            //UserListComponent,
        ],
        imports: [
            BrowserAnimationsModule,
            RouterModule.forRoot(AppRoutes, {
                useHash: true
            }),
            SidebarModule,
            NavbarModule,
            ToastrModule.forRoot(),
            FooterModule,
            ReactiveFormsModule,
            FixedPluginModule,
            HttpClientModule,
            FormsModule,
        ],
        providers: [AuthService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map