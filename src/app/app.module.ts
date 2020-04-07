import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QwixxBarComponent } from './components/qwixx-bar/qwixx-bar.component';
import { QwixxComponent } from './views/qwixx/qwixx.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QwixxFailedComponent } from './components/qwixx-failed/qwixx-failed.component';
import { QwixxMenuComponent } from './components/qwixx-menu/qwixx-menu.component';

import { QwixxSettingsService } from './services/qwixx-settings.service';
import { CookieService } from 'ngx-cookie-service';
import { RollDicesComponent } from './components/roll-dices/roll-dices.component';
import { SceneService } from './services/scene.service';
import { QwixxDiceComponent } from './components/qwixx-dice/qwixx-dice.component';

@NgModule({
  declarations: [
    AppComponent,
    QwixxBarComponent,
    QwixxComponent,
    QwixxFailedComponent,
    QwixxMenuComponent,
    RollDicesComponent,
    QwixxDiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [
    CookieService,
    QwixxSettingsService,
    SceneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
