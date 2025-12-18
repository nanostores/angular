import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { NanostoresService } from "@nanostores/angular";
import { Observable, switchMap } from "rxjs";
import { profile } from "../stores/profile";
import { IUser, User } from "../stores/user";

@Component({
  selector: "app-current-user-async-pipe",
  imports: [AsyncPipe],
  template: "@if ((currentUser$ | async); as user) {<p>{{ user.name }}</p>}",
  standalone: true,
})
export class CurrentUserAsyncPipeComponent {
  private nanostores = inject(NanostoresService);

  currentUser$: Observable<IUser> = this.nanostores
    .useStore(profile)
    .pipe(switchMap(({ userId }) => this.nanostores.useStore(User(userId))));
}
