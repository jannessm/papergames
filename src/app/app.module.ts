import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QwixxBarComponent } from './components/qwixx-bar/qwixx-bar.component';
import { QwixxComponent } from './views/qwixx/qwixx.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QwixxFailedComponent } from './components/qwixx-failed/qwixx-failed.component';

@NgModule({
  declarations: [
    AppComponent,
    QwixxBarComponent,
    QwixxComponent,
    QwixxFailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
