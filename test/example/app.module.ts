import { NANOSTORES, NanostoresModule, NanostoresService } from '@nanostores/angular';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CurrentUserAsyncPipeComponent } from './current-user-async-pipe/current-user-async-pipe.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CurrentUserComponent,
    CurrentUserAsyncPipeComponent,
  ],
  imports: [
    BrowserModule,
    NanostoresModule,
  ],
  providers: [{ provide: NANOSTORES, useClass: NanostoresService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
