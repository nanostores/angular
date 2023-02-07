import { Component } from '@angular/core';
import { IUser, User } from '../stores/user';
import { profile } from '../stores/profile';
import { NanostoresService } from "@nanostores/angular";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: 'app-current-user-async-pipe',
  template: `
    <p *ngIf="(currentUser$ | async) as user">{{ user.name }}</p>
    <div>{{ profile | stored | json }}</div>
  `
})
export class CurrentUserAsyncPipeComponent {

  profile = profile;

  currentUser$: Observable<IUser> = this.nanostores.useStore(profile)
    .pipe(switchMap(({ userId }) => this.nanostores.useStore(User(userId))));

  constructor(private nanostores: NanostoresService) {}
}
