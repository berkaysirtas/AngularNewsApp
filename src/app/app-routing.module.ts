import { InterfaceComponent } from './components/interface/interface.component';
import { HaberDetayComponent} from './components/haber-detay/haber-detay.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { HaberlerComponent } from './components/Haberler/haberler.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/service/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';


const routes: Routes = [
  {
    path: "kategoriler",
    component: CategoryComponent,
  },
  { path: "haberler", component: HaberlerComponent },
  { path: "haberDetay/:id", component: HaberDetayComponent },
  { path: "giris", component: LoginComponent },

  
  {
    path: "anasayfa",
    component: HomeComponent,
  },
  {
    path: "",
    component: InterfaceComponent,
  },
  {
    path: "interface",
    component: InterfaceComponent,
  },
  {
    path: "kullanicilar",
    component: KullanicilarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
