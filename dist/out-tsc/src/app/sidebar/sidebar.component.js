import { __decorate } from "tslib";
import { Component } from '@angular/core';
/* export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];
*/
export const ROUTES = [
    { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '' },
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/notifications', title: 'Games', icon: 'nc-controller-modern', class: '' },
    { path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
    { path: '/typography', title: 'About', icon: 'nc-caps-small', class: '' },
];
let SidebarComponent = class SidebarComponent {
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
};
SidebarComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'sidebar-cmp',
        templateUrl: 'sidebar.component.html',
    })
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map