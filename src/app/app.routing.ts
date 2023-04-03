import { Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HelloWorldService } from './hello-world.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MathComponent } from './math/math.component';
import { SignupComponent } from './signup/signup.component';
import { WordSearchComponent } from './word-search/word-search.component';

export const AppRoutes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'game1',component:CardComponent},
  {path:'game2',component:MathComponent},
  {path:'game3',component:WordSearchComponent},


  {
    path: 'main',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
