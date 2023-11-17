import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopSingleComponent } from './pages/shop-single/shop-single.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Start',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'Start', component: StartComponent },
  { path: 'Shop', component: ShopComponent },
  { path: 'Shop-Single', component: ShopSingleComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'About', component: AboutComponent },


  {
    path: 'components',
    loadChildren: () =>
      import('./component/component.module').then((m) => m.ComponentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
