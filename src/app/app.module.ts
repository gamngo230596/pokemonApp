import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { CollectionsComponent } from './collections/collections.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigatorComponent,
    HomeComponent,
    PokemonDialogComponent,
    CollectionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    CarouselModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    FormsModule
  ],
  entryComponents: [
    PokemonDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
