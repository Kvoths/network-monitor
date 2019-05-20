import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { CommandModule } from './command/command.module';
import { ProbeModule } from './probe/probe.module';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    CommandModule,
    ProbeModule,
    AlertModule,
    MatSidenavModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
