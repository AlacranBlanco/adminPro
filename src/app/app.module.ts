import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from "./app-routing.module";
import {PagesModule} from "./pages/pages.module";

import {AppComponent} from './app.component';
import {NopagefoundComponent} from './pages/nopagefound/nopagefound.component';
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
