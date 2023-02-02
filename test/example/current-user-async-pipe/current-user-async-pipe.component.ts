import { IUser, User } from '../stores/user';
import { Observable, switchMap } from 'rxjs';
import { Component } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { profile } from '../stores/profile';

@Component({
  selector: 'app-current-user-async-pipe',
  template: '<p *ngIf="(currentUser$ | async) as user">{{ user.name }}</p>'
})
export class CurrentUserAsyncPipeComponent {
  currentUser$: Observable<IUser> = this.nanostores.useStore(profile)
    .pipe(switchMap(userId => this.nanostores.useStore(User(userId))));

  constructor(private nanostores: NanostoresService) { }
}
