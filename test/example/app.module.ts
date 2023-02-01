import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NANOSTORES, NanostoresService } from '@nanostores/angular';

import { AppComponent } from './app.component';
import { FruitsWithAsyncPipeComponent } from './fruits-with-async-pipe/fruits-with-async-pipe.component';
import { FruitsComponent } from './fruits/fruits.component';

@NgModule({
  declarations: [
    AppComponent,
    FruitsComponent,
    FruitsWithAsyncPipeComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: NANOSTORES, useClass: NanostoresService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
