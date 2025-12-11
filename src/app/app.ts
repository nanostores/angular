import { Component } from '@angular/core';
import { NanostoresService } from '../../projects/nanostores-angular/src/lib/nanostores.service';
import { NANOSTORES } from '../../projects/nanostores-angular/src/lib/nanostores.token';
import { CurrentUserAsyncPipeComponent } from './current-user-async-pipe/current-user-async-pipe.component';
import { CurrentUserComponent } from './current-user/current-user.component';

@Component({
  selector: 'app-root',
  imports: [CurrentUserComponent, CurrentUserAsyncPipeComponent],
  providers: [{ provide: NANOSTORES, useClass: NanostoresService }],
  templateUrl: './app.html',
  standalone: true,
})
export class App {}
