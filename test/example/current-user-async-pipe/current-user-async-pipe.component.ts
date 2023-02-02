import { Component } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { Observable, switchMap } from 'rxjs';

import { profile } from '../stores/profile';
import { IUser, User } from '../stores/user';

@Component({
  selector: 'current-user-async-pipe',
  template: '<p *ngIf="(currentUser$ | async) as user">{{ user.name }}</p>'
})
export class CurrentUserAsyncPipeComponent {
  currentUser$: Observable<IUser> = this.nanostores.useStore(profile)
    .pipe(switchMap(userId => {
        return this.nanostores.useStore(User(userId));
      })
    );

  constructor(private nanostores: NanostoresService) { }
}
