import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProductComponent } from './pages/product/product.component';
import { AuthGuard } from './auth.guard';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '' }
];
