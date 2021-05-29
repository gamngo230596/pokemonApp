import { CollectionsComponent } from './collections/collections.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'collections', component: CollectionsComponent },
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }