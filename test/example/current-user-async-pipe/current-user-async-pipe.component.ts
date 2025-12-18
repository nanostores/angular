import { Component, inject } from "@angular/core";
import { NanostoresService } from "@nanostores/angular";
import { Observable, switchMap } from "rxjs";
import { profile } from "../stores/profile";
import { IUser, User } from "../stores/user";

@Component({
  selector: "app-current-user-async-pipe",
  template: '<p *ngIf="(currentUser$ | async) as user">{{ user.name }}</p>',
  standalone: false,
})
export class CurrentUserAsyncPipeComponent {
  private nanostores = inject(NanostoresService);

  currentUser$: Observable<IUser> = this.nanostores
    .useStore(profile)
    .pipe(switchMap(({ userId }) => this.nanostores.useStore(User(userId))));
}
