import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NANOSTORES, NanostoresService } from '@nanostores/angular';

import { AppComponent } from './app.component';
import { CurrentUserAsyncPipeComponent } from './current-user-async-pipe/current-user-async-pipe.component';
import { CurrentUserComponent } from './current-user/current-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentUserComponent,
    CurrentUserAsyncPipeComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: NANOSTORES, useClass: NanostoresService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
