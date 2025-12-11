import { Component, inject } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { NanostoresService } from "../../../projects/@nanostores-angular/src/lib/nanostores.service";
import { profile } from "../stores/profile";
import { IUser, User } from "../stores/user";

@Component({
  selector: "app-current-user-async-pipe",
  template: '@if ((currentUser$ | async); as user) {<p>{{ user.name }}</p>}',
  standalone: false,
})
export class CurrentUserAsyncPipeComponent {
  private nanostores = inject(NanostoresService);

  currentUser$: Observable<IUser> = this.nanostores
    .useStore(profile)
    .pipe(switchMap(({ userId }) => this.nanostores.useStore(User(userId))));
}
