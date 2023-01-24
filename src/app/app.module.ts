import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NANOSTORES, NanostoresService } from '@nanostores/angular';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CounterWithAsyncPipe } from './counterWithAsyncPipe/counterWithAsyncPipe.component';
import { FilteredFruitsComponent } from './filteredFruits/filtered-fruits.component';
import { FruitsWithAsyncPipeComponent } from './fruits-with-async-pipe/fruits-with-async-pipe.component';
import { FruitsComponent } from './fruits/fruits.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterWithAsyncPipe,
    FruitsComponent,
    FruitsWithAsyncPipeComponent,
    ProfileComponent,
    FilteredFruitsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: NANOSTORES, useClass: NanostoresService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
