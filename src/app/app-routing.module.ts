import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { LoginComponent } from './user-auth/login/login.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path:'',
    component: IndexComponent,
    title: 'Home page',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products',
        component: ProductComponent,
        title: "Product page"
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
        title: "Product details"
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "login"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
